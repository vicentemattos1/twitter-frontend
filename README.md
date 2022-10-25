## Getting Started

First, install dependences:

```bash
npm install
# or
yarn
```

Then run the server:

```bash
npm run dev
# or
yarn dev
```

## The User Data is filled with my personal data, you can change that in UserContext.tsx on userInit

## I spent three days to do this project

# Phase 2, planning:
## Questions: Would the reply-to-post would have the original post data being showed just like twitter?
## Questin 2: I would create a new field that is called original_post with the id of the original post. For the frontend side I would look if that field is filled, if it does, the post would have the normal text and the content from original post bellow, just like we have in twitter

# Phase 3, self-critique & scaling

## What I would do to improve this project is a like option to the posts
## Authentication
## Be able to edit the post and comments
## With authentication, let the user be available to update his data

## Virtualization would be my fisrt thought. For a large amount of data, the page would take too many time to render things. With virtualization, the backend would provide the posts data in pieces, instead of return 1000 posts, would return pages of 30 for exemple. Those pages could be accessible by a request to a backend and all pages would have the same size.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
