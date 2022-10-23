import { defineStore } from "pinia";
import { PiniaNameSpace } from "./nameSpace";

export const useThemeSwitchStore = defineStore(
	PiniaNameSpace.ThemeSwitchStore,
	{
		state: () => {
			return {
				theme: 1,
			};
		},
		actions: {
			//初始化
			init() {
				//初始化，从缓存中获取当前主题
				if (!localStorage.getItem("theme")) {
					this.theme = 1;
					this.switchTheme(1);
					return;
				}
				let theme: number = Number(localStorage.getItem("theme"));
				this.theme = theme;
				this.switchTheme(theme);
			},

			//切换主题
			switchTheme(theme: number | string | null): void {
				if (!theme) theme = this.theme;
				this.theme = theme;
				//大于0说明是亮色 反之是暗色
				switch (Number(theme)) {
					case 1:
						document.documentElement.setAttribute(
							"data-theme",
							"lightTheme"
						);
						break;
					case 8:
						document.documentElement.setAttribute(
							"data-theme",
							"chineseTheme"
						);
						break;
					case -1:
						document.documentElement.setAttribute(
							"data-theme",
							"darkTheme"
						);
						break;
					case -2:
						document.documentElement.setAttribute(
							"data-theme",
							"cyberpunkTheme"
						);
						break;
				}
				localStorage.setItem("theme", String(theme));
			},
		},
		getters: {},
	}
);
