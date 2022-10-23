const keys = {
	//model
	Auth: Symbol(),
	User: Symbol(),
	Admin: Symbol(),
	Problem: Symbol(),
	Training: Symbol(),
	Contest: Symbol(),
	Submit: Symbol(),
	File: Symbol(),
	//location
	Service: Symbol(),
	Logic: Symbol(),
	Models: Symbol(),

	//operation
	MysqlAdd: Symbol(),
	MysqlDelete: Symbol(),
	MysqlUpdate: Symbol(),
	MysqlQuery: Symbol(),
	RedisAdd: Symbol(),
	RedisDelete: Symbol(),
	RedisUpdate: Symbol(),
	RedisQuery: Symbol(),
	ServerBusy: Symbol(), //服务器繁忙
	ServerError: Symbol(), //服务器错误
	Parsesparameters: Symbol(), //解析参数
	ParametersTypeError: Symbol(), //参数类型错误
	ParametersFormatError: Symbol(), //参数格式错误
	ParametersConversionError: Symbol(), //参数转换失败
	TokenBuildError: Symbol(), //创建错误
	DataEmpty: Symbol(), //数据为空
	DataNotExist: Symbol(), //数据不存在
	DataResolutionError: Symbol(), //数据解析失败
	UIDExist: Symbol(), //UID已存在
	UIDNotExist: Symbol(), //UID不存在
	UIDEmpty: Symbol(), //UID为空
	PasswordError: Symbol(), //密码错误
	PasswordEmpty: Symbol(), //密码为空
	Notimplemented: Symbol(), //接口未实现
};


const Module = {
	[keys.Auth]: 101,
	[keys.User]: 102,
	[keys.Admin]: 103,
	[keys.Problem]: 104,
	[keys.Training]: 105,
	[keys.Contest]: 106,
	[keys.Submit]: 107,
	[keys.File]: 108,
};

const Location = {
	[keys.Service]: 1,
	[keys.Logic]: 2,
	[keys.Models]: 3,
};

const Operation = {
	[keys.MysqlAdd]: 11,
	[keys.MysqlDelete]: 12,
	[keys.MysqlUpdate]: 13,
	[keys.MysqlQuery]: 14,
	[keys.RedisAdd]: 15,
	[keys.RedisDelete]: 16,
	[keys.RedisUpdate]: 17,
	[keys.RedisQuery]: 18,
	[keys.ServerBusy]: 30,
	[keys.ServerError]: 31,
	[keys.Parsesparameters]: 32,
	[keys.ParametersTypeError]: 33,
	[keys.ParametersFormatError]: 34,
	[keys.ParametersConversionError]: 35,
	[keys.TokenBuildError]: 36,
	[keys.DataEmpty]: 40,
	[keys.DataNotExist]: 41,
	[keys.DataResolutionError]: 42,
	[keys.UIDExist]: 50,
	[keys.UIDNotExist]: 51,
	[keys.UIDEmpty]: 52,
	[keys.PasswordError]: 53,
	[keys.PasswordEmpty]: 54,
	[keys.Notimplemented]: 99,
};

export { keys, Module, Location, Operation };

/*
template: 

	switch (OperationCode) {
		case Operation[keys.MysqlAdd]:
			break;
		case Operation[keys.MysqlDelete]:
			break;
		case Operation[keys.MysqlUpdate]:
			break;
		case Operation[keys.MysqlQuery]:
			break;
		case Operation[keys.RedisAdd]:
			break;
		case Operation[keys.RedisDelete]:
			break;
		case Operation[keys.RedisUpdate]:
			break;
		case Operation[keys.RedisQuery]:
			break;
		case Operation[keys.ServerBusy]:
			break;
		case Operation[keys.ServerError]:
			break;
		case Operation[keys.Parsesparameters]:
			break;
		case Operation[keys.ParametersTypeError]:
			break;
		case Operation[keys.ParametersFormatError]:
			break;
		case Operation[keys.ParametersConversionError]:
			break;
		case Operation[keys.TokenBuildError]:
			break;
		case Operation[keys.DataEmpty]:
			break;
		case Operation[keys.DataNotExist]:
			break;
		case Operation[keys.DataResolutionError]:
			break;
		case Operation[keys.UIDExist]:
			break;
		case Operation[keys.UIDNotExist]:
			break;
		case Operation[keys.UIDEmpty]:
			break;
		case Operation[keys.PasswordError]:
			break;
		case Operation[keys.PasswordEmpty]:
			break;
		case Operation[keys.Notimplemented]:
	}
*/