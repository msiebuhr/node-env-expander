env-expander
============

Enriches your configuration with environment variables;

Given the environment variables `$USERNAME=root` and `$PASSWORD=123456`, the following configuration

    envExpander.expander({
        "username": "ENV:$USERNAME",
        "password": "ENV:$PASSWORD",
        "loginUrl": "https://api.example.com/login"
    });

Will expand to this object:

    {
        "username": "root",
        "password": "123456",
        "loginUrl": "https://api.example.com/login"
    }

API
---

`.expander(obj, options)` will recursively expand values `obj` matching
`ENV:$ENV_VAR_NAME`. If `options.env` is given, then lookups will happen there
instead of `process.env`.
