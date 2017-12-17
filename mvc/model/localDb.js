define( [] , function () {
	const DB = {};
	const _ = {'db':DB};

	//@< db > values
		const VAL = {}; DB.val = VAL;

		VAL['systemUser'] = '@system';
		VAL['activeUser'] = 'connectActiveUserId';
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


			//@< main > blocks > second > header
				const SHEADER 		= {}; SECOND['header'] = SHEADER;

				//@< header > base
					var APP_BASE 		= {}; SHEADER['base'] = APP_BASE;

						// base > index
						var PAGE_INDEX 		= {}; APP_BASE['index'] = PAGE_INDEX;

							// index > icon
							var FLAGS = {}; PAGE_INDEX['flags'] = FLAGS;
							FLAGS['hasPseudoUser'] = 'flagHasPseudoUsers';
				//@> menus

			//@> main > blocks > second > header




			//@< main > blocks > second > body
				const SBODY 		= {}; SECOND['body'] = SBODY;
			//@> main > blocks > second > body

		//@>>> main > blocks > second 

		//@<<< main > blocks > third
			const THIRD 		= {}; BLOCKS['third'] = THIRD;

			//@< main > blocks > third > header
				const THHEADER 		= {}; THIRD['header'] = THHEADER;
			//@> main > blocks > third > header

			//@< main > blocks > third > body
				const THBODY 		= {}; THIRD['body'] = THBODY;
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