WEBAUTO REACT version

The bare bones of getting a nodejs and react app up.
https://dev.to/lschwall/make-a-react-app-with-webpack-babel-and-express-30n8

What is included:
- a basic API route
- main React App
- static files route
- SSR of App (server side rendering basics follow instructions: https://javascript.plainenglish.io/server-side-rendering-in-react-expressjs-8a87af0edba4)
- Sharing Inital State (last step in https://javascript.plainenglish.io/server-side-rendering-in-react-expressjs-8a87af0edba4)
  Originally seeing rendered on server for a millisecond, and right after, rendered on client. What we want to see is rendered on server as intial state. Only when clicking on button we should see changed on client.

What needs to be done:
- Routing to work with SSR (allow prefetching data per route before rendering page)
- Homepage (how do we get the image url for orgUnitId, content zone api call ?)
- we need to minimize the amount of data tranfered over the wire as well
  so in the case of the texts and images, we don't need to send
  these keys as part of the APP_STATE after loading data and passing them to component
  as props on the server side. I guess we can say they are server side props. But if they
  are available only on the server and not on the client, how is the component going
  to be rendered on the client side after hydration? the props most likely need to match
  between server and client.
- Source Maps for dev
- CSS
- Header Footer
- Do we need Redux ?
- incorporate Internationalization (i18n) for FR and EN
- Make this a base project to build an ecommerce website on top (a bootstrap script like CRA or NextJS)
- Pre rerendered (cached version of the SSR) homepage, catalog listing (tricky because prices change), inventory listing
- For development, HMR automatic reload when files change
