import { defineStore } from "pinia";
import { PiniaNameSpace } from "./nameSpace";

export const useConstValStore = defineStore(PiniaNameSpace.ConstVal, {
	state: () => {
		return {
			//页面主题数值
			LightTheme: 1,
			DarkTheme: 2,
			Cyberpunk: 3,

			//权限bit表
			UNLOGINBit: 0x01, // B0000 0001
			CommonUserBit: 0x02, // B0000 0010
			AdministratorBit: 0x04, // B0000 0100
			ProblemAdminBit: 0x08, // B0000 1000
			ContestAdminBit: 0x10, // B0001 0000
			SourceBorwserBit: 0x20, // B0010 0000
			ListAdminBit: 0x40, // B0100 0000
			SuperAdminBit: 0x80, // B1000 0000

			//提交代码语言
			SUBMIT_LANG_C: 1,
			SUBMIT_LANG_CPP: 2,
			SUBMIT_LANG_CPP11: 3,
			SUBMIT_LANG_CPP17: 4,
			SUBMIT_LANG_JAVA: 5,
			SUBMIT_LANG_PYTHON3: 6,

			//提交的通过状态颜色
			SUBMIT_STATUS_AC_COLOR: "#5ebd00",
			SUBMIT_STATUS_WA_COLOR: "#e10000",
			SUBMIT_STATUS_TLE_COLOR: "#8a2be2",
			SUBMIT_STATUS_MLE_COLOR: "#a61e4d",
			SUBMIT_STATUS_RE_COLOR: "#bdb76b",
			SUBMIT_STATUS_PE_COLOR: "#5f9ea0",
			SUBMIT_STATUS_OLE_COLOR: "#212121",
			SUBMIT_STATUS_CE_COLOR: "#8c8c8c",
			SUBMIT_STATUS_JUDGING_COLOR: "#ff9933",
			SUBMIT_STATUS_REJUDGING_COLOR: "#ff9933",
			SUBMIT_STATUS_PENDING_COLOR: "#ebcb8b",
			SUBMIT_STATUS_FAILED_COLOR: "#4d1700",

			//题目
			PROBLEM_ORIGIN_LOCAL: -1,
			PROBLEM_ORIGIN_CF: 1,
			PROBLEM_ORIGIN_ATCODER: 2,
			PROBLEM_ORIGIN_LUOGU: 3,

			//竞赛
			CONTEST_PUBLIC: 1,
			CONTEST_NOTPUBLIC: -1,

			CONTEST_TYPE_ACM: 1,
			CONTEST_TYPE_OI: 2,
		};
	},
	actions: {},
	getters: {},
});