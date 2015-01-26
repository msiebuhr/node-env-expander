var expect = require('unexpected');
var envExpand = require('../index');

describe('env-expand.expand', function () {
    it('Expands $FOO=bar + {foo:"ENV:$FOO"} -> {foo:bar}', function () {
        expect(
            envExpand.expand({foo: "ENV:$foo"}, {env:{foo:"bar"}}), 'to equal', {foo: 'bar'}
        )
    });

    it('Expands $FOO=bar + [["ENV:$FOO"]] -> [[bar]]', function () {
        expect(
            envExpand.expand([["ENV:$foo"]], {env:{foo:"bar"}}), 'to equal', [['bar']]
        )
    });

    it('Expands $FOO=bar + "ENV:$FOO" -> bar', function () {
        expect(envExpand.expand("ENV:$FOO", {env: {FOO:"bar"}}), 'to equal', "bar");
    });

    it('Throws error when var isn\'t found', function () {
        expect(function () {
            envExpand.expand("ENV:$FOO", {env: {}})
        }, 'to throw', 'ENV VAR "FOO" not found.');
    });
});
