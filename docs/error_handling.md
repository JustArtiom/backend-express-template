# Error Handling

All thrown errors come in the next interface:

```ts
interface APIErrorResponse {
    code: number;
    errors: {
        code: number;
        status: string;
        message: string;
    }[];
}
```
