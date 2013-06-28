# Microsoft Developer Studio Project File - Name="javascript" - Package Owner=<4>
# Microsoft Developer Studio Generated Build File, Format Version 6.00
# ** DO NOT EDIT **

# TARGTYPE "Win32 (x86) Generic Project" 0x010a

CFG=javascript - Win32 Debug
!MESSAGE This is not a valid makefile. To build this project using NMAKE,
!MESSAGE use the Export Makefile command and run
!MESSAGE 
!MESSAGE NMAKE /f "javascript.mak".
!MESSAGE 
!MESSAGE You can specify a configuration when running NMAKE
!MESSAGE by defining the macro CFG on the command line. For example:
!MESSAGE 
!MESSAGE NMAKE /f "javascript.mak" CFG="javascript - Win32 Debug"
!MESSAGE 
!MESSAGE Possible choices for configuration are:
!MESSAGE 
!MESSAGE "javascript - Win32 Release" (based on "Win32 (x86) Generic Project")
!MESSAGE "javascript - Win32 Debug" (based on "Win32 (x86) Generic Project")
!MESSAGE 

# Begin Project
# PROP AllowPerConfigDependencies 0
# PROP Scc_ProjName ""
# PROP Scc_LocalPath ""
MTL=midl.exe

!IF  "$(CFG)" == "javascript - Win32 Release"

# PROP BASE Use_MFC 0
# PROP BASE Use_Debug_Libraries 0
# PROP BASE Output_Dir "Release"
# PROP BASE Intermediate_Dir "Release"
# PROP BASE Target_Dir ""
# PROP Use_MFC 0
# PROP Use_Debug_Libraries 0
# PROP Output_Dir "Release"
# PROP Intermediate_Dir "Release"
# PROP Target_Dir ""

!ELSEIF  "$(CFG)" == "javascript - Win32 Debug"

# PROP BASE Use_MFC 0
# PROP BASE Use_Debug_Libraries 1
# PROP BASE Output_Dir "Debug"
# PROP BASE Intermediate_Dir "Debug"
# PROP BASE Target_Dir ""
# PROP Use_MFC 0
# PROP Use_Debug_Libraries 1
# PROP Output_Dir "Debug"
# PROP Intermediate_Dir "Debug"
# PROP Target_Dir ""

!ENDIF 

# Begin Target

# Name "javascript - Win32 Release"
# Name "javascript - Win32 Debug"
# Begin Group "lib"

# PROP Default_Filter ""
# Begin Source File

SOURCE=..\..\lib\mw_lib.js
# End Source File
# Begin Source File

SOURCE=..\..\lib\mw_lib_cookie.js
# End Source File
# Begin Source File

SOURCE=..\..\lib\mw_lib_network.js
# End Source File
# Begin Source File

SOURCE=..\..\lib\mw_lib_widget.js
# End Source File
# Begin Source File

SOURCE=..\..\lib\mw_lib_widget_window.js
# End Source File
# Begin Source File

SOURCE=..\..\lib\mw_lib_xml.js
# End Source File
# End Group
# Begin Group "tests"

# PROP Default_Filter ""
# Begin Source File

SOURCE=..\..\tests\index.html
# End Source File
# Begin Source File

SOURCE=..\..\tests\testcase_mw_lib_mw_1.html
# End Source File
# Begin Source File

SOURCE=..\..\tests\testcase_mw_libwidget_1.html
# End Source File
# Begin Source File

SOURCE=..\..\tests\testcase_mw_libwidget_2.html
# End Source File
# Begin Source File

SOURCE=..\..\tests\testcase_mw_libxml_1.html
# End Source File
# End Group
# End Target
# End Project
