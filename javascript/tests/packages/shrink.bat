mkdir .\shrink
mkdir .\shrink\shrink-before
mkdir .\shrink\shrink-after
del .\shrink\shrink-before\*.*  /Q
del .\shrink\shrink-before\js\*.*  /Q
del .\shrink\shrink-after\*.*  /Q
del .\shrink\shrink-after\js\*.*  /Q

copy ..\..\lib\*.js                                .\shrink\shrink-before\

\metawrap\tools\MetaWrap.JavaScript.Shrink.exe all .\shrink\shrink-before                  .\shrink\shrink-after

type .\shrink\shrink-after\mw_lib.js      						>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_datetime.js					>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_pipeline.js					>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_network.js					>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_xml.js						>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_xml_serialise.js				>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_page.js						>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_page_output.js				>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_xml_xslt.js					>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_cookie.js						>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_css.js						>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_view.js						>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_stateviewmap.js				>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_state.js						>>  shrink\mw_pkg_stateviewengine_shrink.js
type .\shrink\shrink-after\mw_lib_xml_action.js					>>  shrink\mw_pkg_stateviewengine_shrink.js

type .\shrink\shrink-after\mw_lib.js      						>  shrink\mw_pkg_standard_shrink.js
type .\shrink\shrink-after\mw_lib_network.js					>>  shrink\mw_pkg_standard_shrink.js
type .\shrink\shrink-after\mw_lib_datetime.js					>>  shrink\mw_pkg_standard_shrink.js
type .\shrink\shrink-after\mw_lib_page.js						>>  shrink\mw_pkg_standard_shrink.js
type .\shrink\shrink-after\mw_lib_page_output.js				>>  shrink\mw_pkg_standard_shrink.js
type .\shrink\shrink-after\mw_lib_cookie.js						>>  shrink\mw_pkg_standard_shrink.js
type .\shrink\shrink-after\mw_lib_css.js						>>  shrink\mw_pkg_standard_shrink.js
type .\shrink\shrink-after\mw_lib_xml.js						>>  shrink\mw_pkg_standard_shrink.js
type .\shrink\shrink-after\mw_lib_xml_serialise.js				>>  shrink\mw_pkg_standard_shrink.js
type .\shrink\shrink-after\mw_lib_xml_action.js					>>  shrink\mw_pkg_standard_shrink.js
	


