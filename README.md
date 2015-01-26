env-expand
==========

Enriches your configuration with environment variables;

    $USERNAME=root
    $PASSWORD=123456

+ 

    envExpand.expand({
        "username": "ENV:$USERNAME",
        "password": "ENV:$PASSWORD",
        "loginUrl": "https://api.example.com/login"
    });

=

    {
        "username": "root",
        "password": "123456",
        "loginUrl": "https://api.example.com/login"
    }

API
---

`.expand(obj, options)` will recursively expand values `obj` matching
`/ENV:$ENV_VAR_NAME`. If `options.env` is given, then lookups will happen there
instead of `process.env`.
