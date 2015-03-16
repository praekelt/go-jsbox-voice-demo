var vumigo = require('vumigo_v02');
var fixtures = require('./fixtures');
var AppTester = vumigo.AppTester;


describe("app", function() {
    describe("GoApp", function() {
        var app;
        var tester;

        beforeEach(function() {
            app = new go.app.GoApp();

            tester = new AppTester(app);

            tester
                .setup.config.app({
                    name: 'test_app'
                })
                .setup(function(api) {
                    fixtures().forEach(api.http.fixtures.add);
                });
        });

        describe("when the user starts a session", function() {
            it("should ask them what they want to do", function() {
                return tester
                    .start()
                    .check.interaction({
                        state: 'states:start',
                        reply: [
                            'Hi there! What do you want to do?',
                            '1. Hear text to speech',
                            '2. Hear recorded message'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to hear text to speech", function() {
            it("should send a text message", function() {
                return tester
                    .setup.user.state('states:start')
                    .input('1')
                    .check.interaction({
                        state: 'states:tts',
                        reply: [
                            'Oak is strong and also gives shade.'
                        ].join('\n')
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });

        describe("when the user asks to hear recorded message", function() {
            it("should send the voice recording", function() {
                return tester
                    .setup.user.state('states:start')
                    .input('2')
                    .check.interaction({
                        state: 'states:recorded',
                        reply: ''
                    })
                    .check(function(api, im, app) {
                        //TODO: Test that audio URL is added to message helper_metadata
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });
    });
});
