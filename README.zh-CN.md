# animated-login-page

[![English README](https://img.shields.io/badge/README-English-blue)](./README.md) [![在线演示](https://img.shields.io/badge/demo-live-22c55e)](https://ningzimu.github.io/animated-login-page/)

一个基于 React 和 Vite 的可复用 animated login page 项目。

这个项目的目标不是只做一个一次性的登录页 demo，而是把参考登录页的视觉风格和交互方式整理成一个更容易运行、修改、迁移、复用的独立项目。

## 在线演示

- https://ningzimu.github.io/animated-login-page/

## 特性

- 多角色动画视觉区
- 会根据输入状态联动的角色交互
- 适配桌面端与手机端的响应式布局
- 清晰的左右分栏登录页结构
- 适合作为其他项目登录页起点的 React 项目骨架
- 方便替换文案、颜色和表单逻辑

## 这个项目的价值

相比一个只演示效果的社区组件，这个仓库更偏向“可直接落地和继续演化的模板工程”。

它适合用来：

- 快速启动一个有设计感的登录页
- 继续接入自己的认证流程
- 作为多个项目共享的登录页基础模板
- 逐步抽离出更通用的 UI 资产

## 技术栈

- React
- Vite
- CSS

## 参考来源

本项目当前主要参考自下面这个社区组件：

- [Animated Characters Login Page](https://21st.dev/community/components/aghasisahakyan1/animated-characters-login-page)

本仓库是基于参考风格进行的独立实现，目标是做成一个更适合复用和二次开发的项目模板。

## 后续计划

- 把主题和品牌文案抽成配置项
- 提供更容易替换的认证逻辑接口
- 继续把角色动画细节往参考组件靠拢
- 进一步优化手机端体验
- 提升在其他项目中的可抽取性和可移植性

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```
