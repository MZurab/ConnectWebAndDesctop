
      <?php
        define('DSS_SERV', isset($_GET['server']) ? $_GET['server'] : 'cryptxdss.office.taxnet.ru');
        define('DSS_SVC_BASE', 'http://' . DSS_SERV . '/');
        define('AUTHENTICATION', 'Authentication/Services/Authentication.svc');
        define('CRYPTOOPERATION', 'CryptxDSS/services/CryptoOperation.svc');
        define('WSDL', '?wsdl');

        try
        {
          $login = 'sample_user_cer';
          $passp = 'sample_user_cer';
          $cerUser = 'file://c:/websrv/sites/cert/certificate.cer';
          $pkeyUser = 'file://c:/websrv/sites/cert/PrivateKey.key';
          $passpUser = '123456';
          $cerInt = 'file://c:/websrv/sites/cert/certificate.cer';
          $pkeyInt = 'file://c:/websrv/sites/cert/PrivateKey.key';
          $passpInt = '123456';
          $token = '';

          $authSvc = getSoapClient_Authentication();
          $bLogin = loginSign($authSvc, $cerUser, $pkeyUser, $passpUser, $cerInt, $pkeyInt, $passpInt, $token);
          if ($bLogin == true)
          {
            echo '<br>Авторизация по сертификату успешна. Токен: ' . $token;
          }
          else
          {
            echo '<br>Ошибка при авторизация по сертификату в cryptooperation_sign';
            exit;
          }
          
          $cryptoSvc = getSoapClient_CryptoOperation();
          $fName = 'c:/websrv/sites/upload/Samples.docx';

          cryptoOperation_Sign($cryptoSvc, $token, $fName, $login);
        }
        catch (Exception $e)
        {
          echo '<br>cryptooperation_sign. Исключение: ',  $e -> getMessage(), "\n";
          return false;
        }
        finally
        {
          deactivateToken($authSvc, $token);
        }
        
        /*
          Аутентификация
        */
        function getSoapClient_Authentication()
        {
          try
          {
            echo '<br>Сервер CryptxDSS: ' . DSS_SVC_BASE;
            echo '<br>Wsdl cервера аутентификации CryptxDSS: ' . DSS_SVC_BASE . AUTHENTICATION . WSDL;

            $authSvc = new SoapClient(DSS_SVC_BASE . AUTHENTICATION. WSDL,
              array('exception' => 1
                    , 'location' => DSS_SVC_BASE . AUTHENTICATION
                    , 'uri' => 'http://tempuri.org/IAuthentication'
                    , 'cache_wsdl' => WSDL_CACHE_NONE
                  )
                );

            echo '<br>Подключились к Wsdl Authentication';
            return $authSvc;
          }
          catch (Exception $e)
          {
            echo '<br>getSoapClient_Authentication. Исключение: ' . $e -> getMessage();
            return null;
          }
        }

        /*
          Криптооперации
        */
        function getSoapClient_CryptoOperation()
        {
          try
          {
            echo '<br>Сервер CryptxDSS: ' . DSS_SVC_BASE;
            echo '<br>Wsdl cервера криптоопераций CryptxDSS: ' . DSS_SVC_BASE . CRYPTOOPERATION . WSDL;

            $CryptoSvc = new SoapClient(DSS_SVC_BASE . CRYPTOOPERATION . WSDL,
              array('exception' => 1
                    , 'location' => DSS_SVC_BASE . CRYPTOOPERATION
                    , 'uri' => 'http://tempuri.org/ICryptoOperation'
                    , 'cache_wsdl' => WSDL_CACHE_NONE
                  )
                );

            echo '<br>Подключились к Wsdl CryptoOperation';
            return $CryptoSvc;
          }
          catch (Exception $e)
          {
            echo 'getSoapClient_CryptoOperation. Исключение: ' . $e -> getMessage();
            return null;
          }
        }

        /*
          Получение подписи
        */
        function getSignature($authSvc, $cer, $pkey, $passp)
        {
          echo '<br>function GetSignature() begin';

          $tmpPatch = 'c:/websrv/sites/tmp/';
          $tmpData = $tmpPatch . 'data.txt';
          $tmpSign = $tmpPatch . 'sign.txt';

          try
          {
            echo '<br>Получаем данные для подписывания (GetRandomForSign):';
            $res = $authSvc -> GetRandomForSign() -> GetRandomForSignResult;
            $data = $res -> Data;
            $sign = '';

            echo '<br>Начинаем подписывать ' . $data;
           
            file_put_contents($tmpData, $data);
           
            if (openssl_pkcs7_sign($tmpData, $tmpSign,
                                   $cer, 
                                   array ($pkey, $passp), 
                                   array(''),
                                   PKCS7_BINARY
                                  )
                )
            {
              echo "<br>Подписали в " . $tmpSign;
            }
            else
            {
              echo "<br>Ошибка в openssl_pkcs7_sign";
              return '';
            }
            
            if (openssl_pkcs7_verify($tmpSign,
                                    PKCS7_BINARY
                                    )
              )
            {
              echo "<br>Проверили подпись " . $tmpSign;
            }
            else
            {
              echo "<br>Ошибка в openssl_pkcs7_verify";
              return '';
            }

            $sign = file_get_contents($tmpSign);
            
            // получим подпись из файла
            $parts = explode("\n\n", $sign);

            return $parts[1];
          }
          catch (Exception $e)
          {
            echo 'GetSignature(). Исключение: ',  $e -> getMessage(), "\n";
            return '';
          }
          finally
          {
            unlink($tmpData);
            unlink($tmpSign);

            echo '<br>function GetSignature() end';
          }
        }

        /* 
          Авторизация по сертификату
        */
        function loginSign($authSvc, $cerUser, $pkeyUser, $passpUser, $cerInt, $pkeyInt, $passpInt, &$token)
        {
          echo '<br>function loginSign() begin';
          try
          {
            // подпись пользователя
            $signUser = getSignature($authSvc, $cerUser, $pkeyUser, $passpUser);
            
            // подпись интегратора
            $signInt = getSignature($authSvc, $cerInt, $pkeyInt, $passpInt);

            // отправляем запрос
            $params = array(
              'signedRandom' => $signUser,
              'integratorsKey' => $signInt
              );
            $auth = $authSvc -> LoginBySign($params) -> LoginBySignResult;
            
            $token = $auth -> Token;

            if ($auth->Code == 'Authorize')
            {
              return true;
            }
            else
            {
              return false;
            }
          }
          catch (Exception $e)
          {
            echo '<br>loginSign(). Исключение: ' . $e -> getMessage();
            return false;
          }
          finally
          {
            echo '<br>function loginSign() end';
          }
        }
        
        /*
          Подпись
        */
        function cryptoOperation_Sign($cryptoSvc, $token, $fName, $userLogin)
        {
          echo '<br>function cryptoOperation_Sign() begin';
          try
          {
            // документы
            $fh = fopen($fName, 'r');
            $fData = fread($fh, filesize($fName));
            fclose($fh);

            $info = pathinfo($fName);
            $filename = basename($fName,'.'.$info['extension']);

            $doc = array('Name' => $filename, 'File' => $fData);

            $documentCollection = array($doc);
            
            // сертификат
            $certificates = $cryptoSvc -> GetCertificates(array('token' => $token)) -> GetCertificatesResult;
            $cert = $certificates -> Certificates -> Certificate;
            
            $signatureSettings = array( 'Certificate' => $cert,
                                        'CompressionType' => CompressionType::NoCompression,
                                        'EncodingTypeData' => EncodingTypeData::Binary,
                                        'IncludeSignerCertificate' => false,
                                        'IncludeTimestamp' => false,
                                        'IsDetached' => true,
                                        'PinCode' => '11111111',
                                        'SignatureType' => SignatureType::XmldSig,
                                      );
            
            // подписывание
            $params = array(
              'token' => $token,
              'documents' => $documentCollection,
              'signatureSettings' => $signatureSettings
              );

            $res = $cryptoSvc -> Sign($params) -> SignResult;
            
            // проверка результата подписывания
            echo '<br>OperationId ' . $res -> OperationId;
            $operationResult = array(
                'token' => $token,
                'operationId' => $res -> OperationId
              );
            echo '<br>Запрашиваем результат операции, в цикле:';
            do
            {
              usleep(500000);// 5/10 секунды
              $res = $cryptoSvc -> GetOperationResult($operationResult) -> GetOperationResultResult;
            }
            while
              ($res -> Code == 'NotCompleted');
            echo '<br>результат операции ' . $res -> Code;

            if ($res -> Code == 'Error')
            {
              echo '<br>Ошибка при проверке подписи';
              exit;
            }

            if (  ($res -> Code != 'Completed')
              &&  ($res -> Code != 'Error')
              )
            {
              echo '<br>Не ожидаемый ответ';
              exit;
            }

            if ($res -> Code == 'Completed')
            {
              echo '<br>Подпись успешна';
              $documentCollection = $res -> DocumentCollection; 
            }

            // проверка подписи
            echo '<br>Запрашиваем запрос на проверку подписи, в цикле:';
            $verifySettings = array('SignatureVerificationType' => TypeSignatureVerification::SignatureOnly,
                                    'UrlRetrievalTimeout' => 500000,
                                    'VerifyCertificateType' => VerifyCertificateType::NoCheck,
                                    'VerifyDateTimeType' => VerifyDateTimeType::CurrentDateTime,
                                    'Certificate' => $cert);
            $verify = array(
              'token' => $token,
              'documents' => $documentCollection,
              'verifySignSettings' => $verifySettings
              );
              
            do
            {
              usleep(500000);// 5/10 секунды
              $res = $cryptoSvc -> SignVerify($verify) -> SignVerifyResult;
            }
            while
              ($res -> Code == 'NotCompleted');
            
            if ($res -> Code == 'Error')
            {
              echo '<br>Ошибка при проверке подписи';
            }

            if (  ($res -> Code != 'Completed')
              &&  ($res -> Code != 'Error')
              )
            {
              echo '<br>Не ожидаемый ответ';
            }
          }
          catch (Exception $e)
          {
            echo '<br>cryptoOperation_Sign(). Исключение: ',  $e -> getMessage(), "\n";
            return '';
          }
          finally
          {
            echo '<br>function cryptoOperation_Sign() end';
          }
        }

        /* 
          Деактивирование токена авторизации
        */
        function deactivateToken($authSvc, $token)
        {
          echo '<br>function deactivateToken() begin';
          try
          {
            $res = $authSvc -> DeactivateToken($token) -> DeactivateTokenResult;
            
            if ($res -> Code == 'NoAuthorize')
            {
              echo '<br>Деактивирование токена успешно';
              return true;
            }
            else
            {
              echo '<br>Деактивирование токена ошибка: '. $res -> Code;
              return false;
            }
          }
          catch (Exception $e)
          {
            echo '<br>deactivateToken(). Исключение: ' . $e -> getMessage();
            return false;
          }
          finally
          {
            echo '<br>function deactivateToken() end';
          }
        }
      ?>
    