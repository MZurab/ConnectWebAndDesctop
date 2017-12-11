define( ['localdb'] , function (LOCALDB) {
	const DB = {};
	const _ = {'db':DB};

	//@< db > values
		const VAL = {}; DB.val = VAL;

		VAL['curtain'] = '.connectBackgroundCurtain';
	//@> db > valuse



	//@<  db > main
		const MAIN = {}; DB.main = MAIN;

		//@<<< main > blocks
			const BLOCKS 		= {}; MAIN['blocks'] = BLOCKS;
		//@>>> main > blocks


		//@<<< main > blocks > first
			const FIRST 		= {}; BLOCKS['first'] = FIRST;

			//@< main > blocks > first > header
				const FHEADER 		= {}; FIRST['header'] = FHEADER;

				//@< main > blocks > first > header > menus
					const FH_MENUS 		= {}; FHEADER['menus'] = FHEADER;
				//@> main > blocks > first > header > menus
			//@> main > blocks > first > header

			//@< main > blocks > first > body
				const FBODY 		= {}; FIRST['body'] = FBODY;
			//@> main > blocks > first > body

			//@< main > blocks > first > footer
				const FFOOTER 		= {}; FIRST['footer'] = FFOOTER;
			//@> main > blocks > first > footer

		//@>>> main > blocks > first

		
		//@<<< main > blocks > second
			const SECOND 		= {}; BLOCKS['second'] = SECOND;
			SECOND.val 			= '#menusBlock';

			//@< main > blocks > second > header
				const SHEADER 		= {}; SECOND['header'] = SHEADER;
				SHEADER.val 		= SECOND.val + ' .topBlockInMenusBlock';

				//@< header > base
					var APP_BASE 		= {}; SHEADER['base'] = APP_BASE;
					APP_BASE.val 		= SHEADER.val + ' .menuHeaderInMenusBlock[app-name="base"]';

						// base > index
						var PAGE_INDEX 		= {}; APP_BASE['index'] = PAGE_INDEX;
						PAGE_INDEX.val 		= APP_BASE.val + ' .appPage[page-name="index"]'

							//

							// index > userIcon
							var BASEHEADER = {}; PAGE_INDEX['baseHeader'] = BASEHEADER;
							BASEHEADER.val = PAGE_INDEX.val + ' .appBase_userListHeaderContainer';

							// index > userIcon
							var USERICON = {}; PAGE_INDEX['userIcon'] = USERICON;
							USERICON.val = BASEHEADER.val + ' .appBase_userIcon';

							// index > userName
							var USERNAME = {}; PAGE_INDEX['userName'] = USERNAME;
							USERNAME.val = BASEHEADER.val + ' .appBase_ListHeader_dName';
							
							// index > userNameWihPseudoFlag
							var userNameWihPseudoFlag = {}; PAGE_INDEX['userNameWihPseudoFlag'] = userNameWihPseudoFlag;
							userNameWihPseudoFlag.val = `${BASEHEADER.val}.${LOCALDB.db.main.blocks.second.header.base.index.flags.hasPseudoUser} .appBase_ListHeader_dName`;

							
							// index > iconNameWihPseudoFlag
							var userIconWihPseudoFlag = {}; PAGE_INDEX['userIconWihPseudoFlag'] = userIconWihPseudoFlag;
							userIconWihPseudoFlag.val = `${BASEHEADER.val}.${LOCALDB.db.main.blocks.second.header.base.index.flags.hasPseudoUser} .appBase_userIcon`;

							// index > menuSwitchUserBox
							var menuSwitchUserBox = {}; PAGE_INDEX['menuSwitchUserBox'] = menuSwitchUserBox;
							menuSwitchUserBox.val = `${PAGE_INDEX.val}  .appBase_userSelectMenuContainer`;

								// index > menuSwitchUserBox > item
								menuSwitchUserBox.item = {'val': `${menuSwitchUserBox.val} ul`}
				//@> menus

			//@> main > blocks > second > header

			//@< main > blocks > second > body
				const SBODY 		= {}; SECOND['body'] = SBODY;
				SBODY.val 			= SECOND.val + ' .usersBlockContainerInMenusBlock';

				SBODY['toChat'] = '.usersBlockContainerInMenusBlock .scrolBlockForChat .mix.usersBlockInMenusBlock';
			//@> main > blocks > second > body

		//@>>> main > blocks > second 

		//@<<< main > blocks > third
			const THIRD 		= {}; BLOCKS['third'] = THIRD;
			THIRD.val = '#viewBlock';

			//@< main > blocks > third > header
				const THHEADER 		= {}; THIRD['header'] = THHEADER;
					  THHEADER.val 	= THIRD.val + ' .topBlockInViewBlock';
			//@> main > blocks > third > header

			//@< main > blocks > third > body
				const THBODY 		= {}; THIRD['body'] = THBODY;
					  THBODY.val 	= THIRD.val + ' #viewAndChatBlockInViewBlock';
			//@> main > blocks > third > body

		//@>>> main > blocks > third

		

		

	//@> db > main 





	return _;

	/* <@MAP
		db
			doc
				main
					blocks
						first
							header
							body
							footer
						second
							header
							body
						third
							header
							body
	@MAP> */
});