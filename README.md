# LoggerJS

[![NPM Version][npm-image]][npm-url]


A logger wrapper around winston.

<br>

---

## Usage


Basic usage out of the box:

```javascript
import Logger from '@potentii/logger-js';

//...

Logger.global.reset();
Logger.global
    .withLevel('info') // Possible levels: debug, verbose, info, warn, error
    .withService('my-app')
    .addTransport(new Logger.WINSTON.transports.Console({ format: Logger.FORMAT_TEMPLATES.human })); // Possible formats: Logger.FORMAT_TEMPLATES.human, Logger.FORMAT_TEMPLATES.json

//...

Logger.info('USER_FETCH_SUCCESS', 'User fetch successfully', { userId: '1234' });

// ...

try{
    // ...
} catch (err){
    Logger.error('PROCESS_FAILED', 'Processing has failed', err, { userId: '1234', processType: '...' });
}


```

<br>

Using **Dynamic Logging** withing an `express` request:

```javascript
// Define a handler to inject the dynamic logger (before the actual handlers):
app.use((req, res, next) => {
    res.locals.logger = Logger.dynamic({ /* opitional context data associated with this request (like correlationIds, or tracking info) */ });
});

// An example of using the dynamic logging to inject more data into the log:
app.get('/users/:userId', (req, res, next) => {
    res.locals.logger.set({ userId: req.params.userId }); // Setting the userId on the request context (this will be logged on every log of this request)
    res.locals.logger.info('FETCH_USER_STARTED', 'Fetching user...'); // This log will have userId on its payload (you also could pass in more data in the third argument)
    // ...
});
```

<br>

---

<br>

## License
[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@potentii/logger-js.svg
[npm-url]: https://npmjs.org/package/@potentii/logger-js
