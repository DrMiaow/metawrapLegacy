# MetaWrap #

This is my general library and laboratory of code I have been contributing to for the last 20 years.

There is C/C++/C#/JavaScript/Haxe and other stuff.

I'm starting by releasing the JavaScript library - as that seems to be the most requested.

## /javascript ##

The metawrap JavaScript library and general experiments.

/javascript/tests/* is where the actual code is developed and tested.

There is an ant script that then takes these and bundles them together into /javascript/lib

There is also build script that will build an aggregated compressed version.

I starting building the library in the early days of the web, before jquery or prototype so there is a lot of 'you would not do that nowadays' in this code.

### Highlights ###

javascript\tests\macrorecorder - A javascript macro recorder

javascript\tests\logger - A logger class the style of an Amiga "Guru Meditation"

javascript\tests\pipeline - A pipelining/requirements system

javascript\tests\view - Single page app view library.

javascript\tests\state - A state machine library ( [http://www.viddler.com/v/7073ccf7](http://www.viddler.com/v/7073ccf7 "video") ) Integrates with 'view' via 'stateviewmap' to create a state machine driven views libabry.


