// WARNING: This is a generated file.
//          If you edit it you will be sad.
//          Edit src/app.js instead.

var go = {};
go;

go.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var Choice = vumigo.states.Choice;
    var ChoiceState = vumigo.states.ChoiceState;
    var EndState = vumigo.states.EndState;

    var GoApp = App.extend(function(self) {
        App.call(self, 'states:start');

        self.states.add('states:start', function(name) {
	
            return new ChoiceState(name, {
                question: 'Hi there! What do you want to do?',

                choices: [
                    new Choice('states:tts', 'Hear text to speech'),
                    new Choice('states:recorded', 'Hear recorded message')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:tts', function(name) {
            return new EndState(name, {
                text: 'Oak is strong and also gives shade.',
                next: 'states:start'
            });
        });

        self.states.add('states:recorded', function(name) {
            return new EndState(name, {
                text: 'If you are hearing this, playing the recording has failed.',
                next: 'states:start',
                helper_metadata: {
                    voice: {
                        speech_url: 'https://cdn.rawgit.com/praekelt/go-jsbox-voice-demo/develop/data/160606__blouhond__gautrain-announcement-1.wav'
                    }
                }
            });
        });

    });

    return {
        GoApp: GoApp
    };
}();

go.init = function() {
    var vumigo = require('vumigo_v02');
    var InteractionMachine = vumigo.InteractionMachine;
    var GoApp = go.app.GoApp;


    return {
        im: new InteractionMachine(api, new GoApp())
    };
}();
