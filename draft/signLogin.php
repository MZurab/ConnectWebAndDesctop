
      <?php
        define('DSS_SERV', isset($_GET['server']) ? $_GET['server'] : 'cryptxdss.office.taxnet.ru');
        define('DSS_SVC_BASE', 'http://' . DSS_SERV . '/');
        define('AUTHENTICATION', 'Authentication/Services/Authentication.svc');
        define('WSDL', '?wsdl');

        $login = 'sample_user';
        $passp = 'sample_user';
        $token = '';
        $authSvc = getSoapClient_Authentication();
        $bLogin = loginAuthentication($authSvc, $login, $passp, $token);

        if ($bLogin == true)
        {
          echo '<br>Авторизация по паролю успешна. Токен: ' . $token;
          deactivateToken($authSvc, $token);
        }
        else
        {
          echo '<br>Ошибка при авторизация по паролю';
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
          Авторизация по паролю
        */
        function loginAuthentication($authSvc, $login, $passp, &$token)
        {
          echo '<br>function loginAuthentication() begin';
          try
          {
            $params = array(
              'login' => $login,
              'password' => $passp);
            $auth = $authSvc -> Login($params) -> LoginResult;
            $token = $auth -> Token;
            if ($auth -> Code == 'Authorize')
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
            echo '<br>loginAuthentication(). Исключение: ' . $e -> getMessage();
            return false;
          }
          finally
          {
            echo '<br>function loginAuthentication() end';
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
    