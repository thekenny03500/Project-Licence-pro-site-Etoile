module.exports = class errorPerso{
	constructor(code, stack) {
		this.code = code;
		if(stack)
		{
			this.stack = stack;
		}	
		else
		{
			switch(code)
			{
				case 400:
					this.stack = "Bad Request!";
					break;
				case 403:
					this.stack = "Forbidden!";
					break;
				case 404:
					this.stack = "Not Found!";
					break;
				case 500:
					this.stack = "Internal serveur error";
					break;
				default:
					this.stack = "Not defined!"
			}
		}
	}
}