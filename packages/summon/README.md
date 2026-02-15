# Summon

Summon is a very simple wrapper for fetch that provides type safe requests and
responses and error handling. It doesn't have any dependencies, and is designed
with simplicity in mind. If you need more complex features, there are other
fetch wrappers that may be a better fit.

## Installation

### npm

```bash
npm add @greenymcgee/summon
```

### pnpm

```bash
pnpm add @greenymcgee/summon
```

## Usage

### GET Request

```ts
import { Summon, type SummonError } from '@greenymcgee/summon'

async function getPosts() {
  try {
    // the second generic is the error type for GET requests, and it's the third for any request that has a body
    const { data } = await Summon.get<{ posts: Post[] }, { message: string }>(
      'https://your-site.com/posts',
    )
    return data.posts
  } catch (error) {
    logger.error(error, error.message)
    return (error as SummonError<{ message: string }>).response.data.message
  }
}
```

### Request With Params

```ts
import { Summon } from '@greenymcgee/summon'

async function createPost(post: Post) {
  try {
    // the body is stringified before being sent
    const { data } = await Summon.post<{ post: Post }, { post: Post }>(
      'https://your-site.com/posts',
      { body: post },
    )
    return data.post
  } catch (error) {
    logger.error(error, error.message)
  }
}
```

## Summoner

Summoner is a class that provides an optional base URL and headers for
all requests.

```ts
import { Summoner, type SummonError } from '@greenymcgee/summon'

const baseAPI = new Summoner({
  baseURL: 'https://your-site.com',
  headers: { 'content-type': 'application/json' },
})

async function getPosts() {
  try {
    // makes a GET request to https://your-site.com/posts with the headers saved in the instance
    const { data } = await baseAPI.get<{ posts: Post[] }, { message: string }>('/posts')
    return data.posts
  } catch (error) {
    logger.error(error, error.message)
    return (error as SummonError<{ message: string }>).response.data.message
  }
}
```

## SummonResponseBuilder

SummonResponseBuilder is a class that provides methods for building SummonResponses.
It's used internally by Summon to create the responses, but can be used to
create your own responses if needed.

```ts
import { SummonResponseBuilder } from '@greenymcgee/summon'

const responseBuilder = new SummonResponseBuilder(
  new Response(JSON.stringify({ message: 'success' }), {
    status: 200,
    statusText: 'Success',
  }),
)

const response = await responseBuilder.buildSuccess()
console.log(response.data)
```
