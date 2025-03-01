# Changelog

## v1.1.0

### New Features

- **Advanced Error Handling:** You can now throw errors inside your handlers and it will be catched and returned to the client without making your app crash

### Changes

- **Simple and compact:** The code has been simplified removing some unnecessary packages
- **New configurations:** Simplify your development and the way you preffer to write your code using the prettier and tsup configs
- **More advanced Typings:** You can now pass the prehandlers and the parameters will be automatically typed based on your middlewares

## v1.0.0

### New Features

- **File-Based Routing:** Implemented a system where each file in the routes directory corresponds to an API endpoint, organized by HTTP methods for clarity and ease of navigation.
- **Dynamic Routing:** Added support for dynamic URL segments, allowing for more flexible and complex routing structures that can adapt to various data and parameters.
- **Prehandlers and Validations:** Introduced pre-route logic and validation mechanisms for request bodies, headers, and parameters to ensure the integrity and correctness of incoming data.
- **Advanced Error Handling:** Developed a comprehensive error handling system capable of capturing and reporting multiple errors simultaneously, enhancing the debugging process and improving the feedback loop for API consumers.
- **Prisma Database Integration:** Integrated Prisma ORM for streamlined database operations, including migrations and schema management, to facilitate easier data manipulation and management.
- **TypeScript Support:** Full TypeScript support to leverage type safety and modern JavaScript features, improving code quality and developer experience.

### Additional Notes

- Improved documentation and examples to help you get started quickly.
- Streamlined installation and setup process for a smooth initial experience.
- Introduced a standardized error interface (APIErrorResponse) for consistent API responses.
- Established guidelines for community contributions and open-source collaboration.
