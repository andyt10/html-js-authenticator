
<h2> About </h2>
This is an html/js(jQuery) based implementation of the RFC6238 TOTP standard a la 'Google Authenticator'.

<img src="https://s3-ap-southeast-2.amazonaws.com/grabbox-andyt10/longTerm/codeExample.png" style="width:40%; height=30%;" alt="example"/>
<img src="https://s3-ap-southeast-2.amazonaws.com/grabbox-andyt10/longTerm/codeExpiring.png" style="width:40%; height=30%;" alt="example"/>

<h3> Setup </h3>

Simply edit the <code>data.json</code> file with the necessary details as per the examples given. 

<img src="https://s3-ap-southeast-2.amazonaws.com/grabbox-andyt10/longTerm/jsonDataExample.png" style="width:40%; height=30%;" alt="example"/>

<h3>A note about security </h3>

The obvious benefit of two-factor auth is that if your password is compromised, your account(s) are still secure.
Needless to say, you should treat the seeds to your authenticator tokens as you would passwords. Wherever you use this make sure it is _relatively_ secure, using at least some HTML auth on the web server.


<h3> Necessaries </h3>
This code utilises the wondeful CryptoJS libraries that can be found here: http://code.google.com/p/crypto-js - created by Jeff Mott.

<h3>Licence</h3>

Except where I use material licensed by third parties, bootstrap, jQuery & CryptoJS, this project is released in to the public domain.