This is a boilerplate to create a Next 14 project with pre-configured eslint.

## Add user config to automatically format

###### Add options below to `settings.json`
![Code_5Z25GWNoh1](https://github.com/kevinbre/boilerplate-next/assets/82427578/afda939d-1691-4e73-a3a9-b5c7cb76951d)

```
{
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "always" 
  },
  "css.format.enable": false,
  "scss.format.enable": false,
  "less.format.enable": false,
  "html.format.enable": false,
  "json.format.enable": false,
  "javascript.format.enable": false,
  "typescript.format.enable": false,
}
```

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
