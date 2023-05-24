---
title: ts 对象参数约束-test
user: dwb
description: 我的记录
date: 2023年5月23日 周二
plum: true
tag:
  - typescript
---

[toc]

根据传入的某一个参数来约束剩余的参数,如果直接赋值对象,需要手动指定泛型，如果使用方法，可以自动推导出泛型

[点我 :eyes:](https://www.typescriptlang.org/play?#code/C4TwDgpgBAKghgcwM5QLxQNYRAewGZQASMAsgDICiANhALYQB2w8CAcnPSXGANwBQfUJFiJqdRsADS2JAB4YUCAA9gjACYoWSAHxpM2fEVKUa9Ji3aduAbRgBdfoPDQA8mGABLHAzhUxZ4ABBYGAAJzkFZVUGDRFkXXQAbz4oKGsMKA8GOP8JaRAI7TsAfgAuI3Jc80RLCC4wWzt0hz4AX34haEJgWioAZQgAY09veUUVdU1EHT1k1OBEcph+VLBQnDAkcrcRnz9TCWCwwv52gUHvJGAoQdCIOFUAYW88DwQ9MajJuJ0ACjA4KEOFsiD1+kNdvJtABKNC6AFA2hIRwAehRUEA-vKACldAJ2mgFWbQD3yoBTuUAV4GACqVAO3BgDXlQAMSoBP7UAKXqAELdANs2gGj1Pi3e5PF5vX5zKALBDlABEACMAK4hbwigA0KSgaw2IIFqTUHiQcDFNDU5TCEog8tSrXlrWhqPRgExUwD30YAuT0A0fKALH+oOqAG5QQCFNoBIcxdGq1OqggD0dQDkBpy7g8IM8GK8EPyFULRW65QqlZtyqrfZrtRBdYLQgajVATW1zQI0ZisXTAIYxgAB0wCBkYBpIzJgHBjQBZ2uzOZdrhdo29yt1egNhl4GLIAOSS6UMMcJKAChNQcVS4AywuplUKtV+7O5-WGhXFs5lq12p2+93ezP+nNB0M9q43XkIACM-bBQ8hY7dM9m8cWi6TNd1jTOdNyvHc9XzfdjVNRwgA)

``` typescript
type Tags = keyof HTMLElementTagNameMap;

type TagElementKeys<T extends Tags> = keyof HTMLElementTagNameMap[T];

type OptionalElementAttrs<T extends Tags> = {
  [k in TagElementKeys<T>]?: HTMLElementTagNameMap[T][k];
};
type HtmlSection<T extends Tags> = {
  tag: T;
  props: OptionalElementAttrs<T>;
};

const createConfig = <T extends Tags>(params: HtmlSection<T>) => params;

// 使用方法可以自动获取到对应的泛型
createConfig({
  tag: "button",
  props: {
    disabled: true,
  },
});

// 使用对象需要手动指定泛型
const config: HtmlSection = {
  tag: "button",
  props: {
    disabled: true,
  },
};

console.log(config);
```
