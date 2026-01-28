/**
 * IPS Rapor Renderer - Kurumsal Tasarım v3.0
 * 
 * Kuveyt Türk Portföy Kurumsal Kimlik Standartlarına Uygun
 * Emoji yerine UIKit ikonları kullanır
 * Tablet/mobil düzenleme desteği
 */

const IPS_LOGO_BASE64 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NTkuMzYgMTQzLjciPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICNmZmZmZmY7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+CiAgICA8Zz4KICAgICAgPGc+CiAgICAgICAgPHJlY3QgY2xhc3M9ImNscy0xIiB4PSIzNjUuNjIiIHk9IjE5LjkiIHdpZHRoPSIxLjUyIiBoZWlnaHQ9IjI5LjkyIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMzc3LjM0LDIwLjdoMTEuMDljNi41NywwLDksMi42OSw5LDcuNjh2My44OGMwLDQuOTUtMi42NSw3LjY0LTkuMjYsNy42NGgtNS40NnY5LjIyaC01LjM4di0yOC40MlpNMzg4LjEzLDI1LjQ0aC01LjQydjkuNzNoNS40MmMzLjAzLDAsMy45My0xLjExLDMuOTMtMy40NnYtMi45YzAtMi4zNS0uOTgtMy4zNy0zLjkzLTMuMzdaIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDA4Ljk1LDQ5LjU1Yy03LjEzLDAtOS4wNS0zLjkzLTkuMDUtOC4xOXYtNS4yNWMwLTQuMjcsMS45Mi04LjE5LDkuMDUtOC4xOXM5LjA1LDMuOTMsOS4wNSw4LjE5djUuMjVjMCw0LjI3LTEuOTIsOC4xOS05LjA1LDguMTlaTTQwOC45NSwzMi4zNWMtMi43NywwLTMuODQsMS4yNC0zLjg0LDMuNTh2NS41OWMwLDIuMzUsMS4wNywzLjU4LDMuODQsMy41OHMzLjg0LTEuMjQsMy44NC0zLjU4di01LjU5YzAtMi4zNS0xLjA3LTMuNTgtMy44NC0zLjU4WiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQzMi4wNCwzMi42OWMtMi4wMS45LTMuNjMsMS44My01LjUsMy4wM3YxMy40aC01LjIxdi0yMC43OGg0LjM5bC4zNCwyLjNjMS4xNS0uNzcsMy42My0yLjIyLDUuNDYtMi43M2wuNTEsNC43OFoiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00NDcuMSw0OC43NGMtMS4xMS40Ny0zLjI0LjgxLTQuNTYuODEtMy44LDAtNS43Mi0xLjc5LTUuNzItNS41di0xMS41NmgtMy4xMnYtNC4xNGgzLjEydi01LjE2bDUuMi0uNzN2NS44OWg1LjMzbC0uMzQsNC4xNGgtNC45OXYxMC44OGMwLDEuMTEuNTEsMS44MywxLjg4LDEuODMuNzcsMCwxLjcxLS4xNywyLjYtLjQzbC42LDMuOTdaIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDYzLjE0LDIzLjZjLS45OC0uMjEtMi4xMy0uMzQtMi45OS0uMzQtMi4wNSwwLTIuMzUuOS0yLjM1LDIuNDd2Mi42aDUuMjlsLS4zLDQuMTRoLTQuOTl2MTYuNjRoLTUuMjF2LTE2LjY0aC0zLjMzdi00LjE0aDMuMzN2LTIuOWMwLTQuMzEsMi4wMS02LjQ0LDYuNjEtNi40NCwxLjYyLDAsMy4xMS4yMSw0LjQ4LjZsLS41NSw0LjAxWiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQ3My45NCw0OS41NWMtNy4xMywwLTkuMDUtMy45My05LjA1LTguMTl2LTUuMjVjMC00LjI3LDEuOTItOC4xOSw5LjA1LTguMTlzOS4wNSwzLjkzLDkuMDUsOC4xOXY1LjI1YzAsNC4yNy0xLjkyLDguMTktOS4wNSw4LjE5Wk00NjcuNzUsMjFoNC4zMXY0LjQ4aC00LjMxdi00LjQ4Wk00NzMuOTQsMzIuMzVjLTIuNzcsMC0zLjg0LDEuMjQtMy44NCwzLjU4djUuNTljMCwyLjM1LDEuMDcsMy41OCwzLjg0LDMuNThzMy44NC0xLjI0LDMuODQtMy41OHYtNS41OWMwLTIuMzUtMS4wNy0zLjU4LTMuODQtMy41OFpNNDc1LjgxLDIxaDQuMzF2NC40OGgtNC4zMXYtNC40OFoiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00OTcuOTIsNDkuMTJsLTIuNzcsOC40MWgtNC45NWwyLjYtOC40MWgtMS44NGwtNi41Ny0yMC43OGg1LjMzbDQuNzQsMTUuNzksNC43OC0xNS43OWg1LjMzbC02LjY2LDIwLjc4WiIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIyNzYuMzEgMTguMDEgMjgwLjMgMTQuMDIgMjc2LjMxIDEwLjA0IDI3Mi4zNCAxNC4wMiAyNzYuMzEgMTguMDEiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMjgxLjY3IDE0LjAyIDI4NS42NSAxMC4wNCAyODkuNjQgMTQuMDIgMjg1LjY1IDE4LjAxIDI4MS42NyAxNC4wMiIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIyNjYuODEgMTQuMDIgMjQxIDE0LjAyIDI0MSAyMC42MyAyNTAuMTEgMjAuNjMgMjUwLjExIDQ5LjEgMjU3LjcgNDkuMSAyNTcuNyAyMC42MyAyNjYuODEgMjAuNjMgMjY2LjgxIDE0LjAyIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMzE4Ljc0LDQwLjc0aDQuODR2LTIwLjExaC0yNC40NXYyOC40N2g3LjU5di04LjM2aDMuMTdsNiw4LjM2aDguODJsLTUuOTctOC4zNlpNMzE1Ljk4LDM0LjEzaC05LjI2di02LjloOS4yNnY2LjlaIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMzI5LjQ2LDQ5LjFoNy41OHYtMTEuMTVoNS43OGMzLjE4LDAsNSwuMDQsNSwzLjI2djcuOWg3LjZ2LTguMDRjMC01LjYyLS44My04LjU3LTcuNDYtOS40NGw3Ljg3LTEwLjk4aC04Ljg2bC03LjY1LDEwLjdoLTIuMjl2LTEwLjdoLTcuNTh2MjguNDdaIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjg1LjY1LDM5LjEydi0xOC40OWg3LjZ2MTguOThjMCw3LjU5LTMuNTgsOS43Mi0xMS45Miw5LjcyLTExLjQsMC0xMi42MS0yLjg4LTEyLjYxLTkuNzJ2LTE4Ljk4aDcuNTh2MTguODNjMCwzLjIzLDEuODMsMy4yNiw1LjAzLDMuMjZzNC4zMS0uMjcsNC4zMS0zLjZaIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjAwLjU5LDMxLjUyYy0zLjE5LDAtNS4wMS0uMDItNS4wMS0zLjI2di03LjY0aC03LjU5djcuOGMwLDUuODkuOSw4Ljg1LDguNDYsOS41NXYxMS4xMmg3LjU5di0xMS4xMmM1Ljg5LS42MSw4LjQ3LTMuMTIsOC40Ny05LjU2di03LjhoLTcuNTl2Ny4yOWMwLDMuMzQtMS4xLDMuNi00LjMzLDMuNloiLz4KICAgICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTgzLjIxIDI2Ljg1IDE3MC4yNyAyNi44NSAxNzAuMjcgMzEuNzEgMTgyLjQxIDMxLjcxIDE4Mi40MSAzNy45NCAxNzAuMjcgMzcuOTQgMTcwLjI3IDQyLjg3IDE4My40NyA0Mi44NyAxODMuNDcgNDkuMSAxNjIuNjcgNDkuMSAxNjIuNjcgMjAuNjMgMTgzLjIxIDIwLjYzIDE4My4yMSAyNi44NSIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMTguOCA0Mi44NyAxMDkuNDcgNDIuODcgMTA5LjQ3IDIwLjYzIDEwMS44NyAyMC42MyAxMDEuODcgNDkuMSAxMjYuNCA0OS4xIDEyNi40IDIwLjYzIDExOC44IDIwLjYzIDExOC44IDQyLjg3Ii8+CiAgICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjIzOS4wOSAyNy4yMyAyMzEuOCAyNy4yMyAyMzEuOCA0OS4xIDIyNC4yMSA0OS4xIDIyNC4yMSAyNy4yMyAyMTYuOTIgMjcuMjMgMjE2LjkyIDIwLjYzIDIzOS4wOSAyMC42MyAyMzkuMDkgMjcuMjMiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik03MC4wMiw0OS4zM2g3LjU5di0xNC40Nmg1Ljc3YzMuMTksMCw1LjAxLjA1LDUuMDEsMy4yN3YxMS4xOWg3LjZ2LTExLjM1YzAtNS42Ny0uODQtOC42MS03LjYxLTkuNDZsOC4xLTE0LjI3aC04LjhsLTcuOTUsMTQuMDFoLTIuMTJ2LTE0LjAxaC03LjU5djM1LjA4WiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEzOS44NiwyMC42M3YxMS41OGMwLDMuOTkuOTcsNi40NSwzLjU3LDkuMjNsMS4xMSwxLjE3LDEuMTYtMS4xN2MyLjU1LTIuNzMsMy41LTUuMzIsMy41LTkuMjN2LTExLjU4aDcuNTl2MTEuNThjMCw5Ljk3LTUuMTMsMTMuODEtOC4wNSwxNi44OWgtOC40MmMtMi45MS0zLjA4LTguMDQtNi45Mi04LjA0LTE2Ljg5di0xMS41OGg3LjU4WiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTI3LjQ5LDU2LjQ0bC0yLjc2LDEuNzItMS44Mi00LjQyLDQuNTgsMi43Wk0yMy4wOSw0NC4zMmw0LjQzLDIuNzQtMi42MiwxLjc3LTEuODEtNC41MVpNMjIuOTUsMzQuOGw0LjY0LDIuOC0yLjcyLDEuOTctMS45Mi00Ljc3Wk0zMC4zMSw0Mi40Nmw0LjU0LTIuODItMS43Niw0LjYyLTIuNzgtMS44Wk0yMy4wMiw0OS4wNGw4LjUxLDUuMTUtMi41NywxLjY3LTQuNDEtMi40OC0xLjUyLTQuMzRaTTI2LjM1LDQ5LjMzbDguNDEtNS4wOS0xLjM2LDQuMDktNC4zOCwyLjk2LTIuNjgtMS45NlpNMjMuMDMsMzkuNzRsOC41Nyw0LjkyLTIuODMsMS45My00LjI4LTIuNTktMS40Ny00LjI2Wk0yNi4yMyw0MC4wNGw4LjU0LTUuMTQtMS41NCw0LjQtNC4xNiwyLjUxLTIuODQtMS43N1pNMjUuOTYsMzUuMTJoNS43bC0yLjcxLDIuMTQtMi45OS0yLjE0Wk0zMC4zMSw1MS42Mmw0LjU0LTIuODEtMS43Niw0LjYyLTIuNzgtMS44MVpNMjguOCwzMS44OXMtNC41OS0xMy4yNC01LjQ2LTE1LjljLS4zNi0xLjA4LS41MS0yLjAxLjE4LTIuOTFsNS4yOC02LjkyLDUuMjcsNi45MmMuNjkuOS41NCwxLjgzLjE5LDIuOTEtLjg3LDIuNjUtNS40NSwxNS45LTUuNDUsMTUuOVpNNTQuNzYsMzMuNGgtMjQuMzRzMTEuMDktNS43LDExLjA5LTUuN2M2LjE4LTMuMTksOC4yMy0uNTIsMTAuNDksMi4yOGwyLjc2LDMuNDJaTTI5Ljg4LDMyLjE4bDcuNjUtMTMuNzFjLjk5LTEuNzcsMy41My0yLjY2LDUuNzUtMS4zM2w4LjYsNS4xNmgtNC4zMmMtMS44OS4wMS0zLjQuNzQtNC43NywxLjYybC0xMi45MSw4LjI2Wk0yLjgzLDMzLjRsMi43Ni0zLjQyYzIuMjYtMi44LDQuMy01LjQ3LDEwLjQ5LTIuMjhsMTEuMDksNS43MUgyLjgzWk0yNy43MSwzMi4xOGwtMTIuOTEtOC4yNmMtMS4zNy0uODgtMi44OC0xLjYtNC43OC0xLjZoLTQuMzFzOC42LTUuMTgsOC42LTUuMThjMi4yMi0xLjMzLDQuNzYtLjQ0LDUuNzUsMS4zM2w3LjY1LDEzLjcxWk0yNS44NSw1OS4wOGw4LjkxLTUuMjctMS43LDUuMTJjLTEuMzcuMi0yLjc2LjMxLTQuMTguMzEtMS4wMiwwLTIuMDMtLjA1LTMuMDItLjE2WiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTI4LjgsMy4wMUMxMi44OSwzLjAxLDAsMTUuOSwwLDMxLjgxczEyLjg5LDI4LjgsMjguOCwyOC44LDI4LjgtMTIuODksMjguOC0yOC44UzQ0LjcxLDMuMDEsMjguOCwzLjAxWk0yOC44LDU5LjIzYy0xNS4xNCwwLTI3LjQyLTEyLjI4LTI3LjQyLTI3LjQyUzEzLjY2LDQuMzgsMjguOCw0LjM4czI3LjQzLDEyLjI5LDI3LjQzLDI3LjQzLTEyLjI4LDI3LjQyLTI3LjQzLDI3LjQyWiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMxMS41NCwxMDAuNzVoLTQuMzV2LTIuM2MtMS43OSwxLjYyLTQsMi43My03LjA3LDIuNzMtMy41OCwwLTQuODEtMS45Mi00LjgxLTQuNzMsMC0uNjguMDktMS40MS4yMS0yLjE3bDEuMDctNi4wNWMuOTQtNS4zMywxLjkyLTguNjUsMTAuMS04LjY1Ljc3LDAsMi4yNi4xMywzLjQxLjM4bDEuNDktOC40NCw1LjI0LS43Mi01LjI4LDI5Ljk1Wk0zMDkuMzYsODQuMTNjLS45NC0uMjEtMi4zLS4yNi0zLjAyLS4yNi0zLjI4LDAtNC4xMywxLjMyLTQuNiw0LjA1bC0xLjI4LDcuMzNjLS4wNC4yNi0uMDQuMzgtLjA0LjUxLDAsLjc3LjUxLDEuMTEsMS40NSwxLjExLDIuMTcsMCw0LjY5LTEuNzUsNS43OS0zLjExbDEuNy05LjYzWiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTMyMi40LDk0LjdjLS4yMSwxLjE5LS4yNiwyLjIyLDEuNjIsMi4yMiwyLjIyLDAsNS4yOC0xLjAyLDcuOTctMi4zOWwxLjExLDMuOTJjLTIuNTEsMS41My02LjM1LDIuNzMtOS44LDIuNzMtNS41LDAtNi42LTMuMDctNS44NC03LjQxbDEuMTEtNi4zMWMuODktNC45LDMuMi03Ljg4LDkuNDYtNy44OCwzLjk2LDAsNi42NSwyLjA1LDYuNjUsNS40MSwwLDMuNzEtMi40Myw1Ljg0LTguMSw3LjU4LTIuNTEuNzctMy4wMi44OS00LDEuMTVsLS4xNy45OFpNMzI5Ljc3LDg1LjJjMC0uOTQtLjgxLTEuNjItMi4xNy0xLjYyLTIuMzQsMC0zLjQ5LDEuNDUtMy44MywzLjQxbC0uMzgsMi4xM2MuNzItLjIxLDEuMDItLjMsMy4xMS0uOTQsMi4zLS43MiwzLjI4LTEuNjIsMy4yOC0yLjk4WiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTM1Mi4xNCwxMDMuOWMtLjgxLDQuNTItMi45OCw1LjY3LTcuNzEsNS42Ny0yLDAtNi4wNS0uNTUtOS4yOS0xLjYybC45OC0zLjc5YzIuNi43Nyw1LjU4LDEuNDEsOC4xOCwxLjQxLDIuMTMsMCwyLjU2LS42NCwyLjg1LTIuNDNsLjgxLTQuNTZjLTIuMywxLjI4LTQuNDcsMS43NS02LjU2LDEuNzUtMy41OCwwLTQuODEtMS45Mi00LjgxLTQuNzMsMC0uNjguMDktMS40MS4yMS0yLjE3bC45NC01LjJjMS4xNS02LjQ4LDIuODEtOC42NSwxMC4yNy04LjY1LDIuNjgsMCw2LjAxLjcyLDguMTQsMS41OGwtNC4wMSwyMi43NVpNMzUwLjUyLDg0LjE4Yy0uOTQtLjE3LTEuOTYtLjMtMy4wMi0uMy0zLjI4LDAtNC4xMywxLjM2LTQuNiw0LjA5bC0xLjE1LDYuNDNjLS4wNC4yNi0uMDQuMzgtLjA0LjUxLDAsLjc3LjUxLDEuMTEsMS40NSwxLjExLDEuNjIsMCwzLjc1LS43Miw1LjU4LTEuOTJsMS43OS05LjkzWk0zNDMuMjgsNzMuMzFsMi42OC0xLjA3Yy4zNCwxLjYyLDEuMTUsMi43NywzLjIsMi43N3MzLjItMS4zMiwzLjk2LTIuOThsMi40NywxLjMyYy0uNzcsMi4zLTIuNzcsNC42NC02LjgyLDQuNjQtMy4zNywwLTUuMjgtMi4zLTUuNS00LjY5WiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTM2My4zNSw5NC43Yy0uMjEsMS4xOS0uMjYsMi4yMiwxLjYyLDIuMjIsMi4yMiwwLDUuMjgtMS4wMiw3Ljk3LTIuMzlsMS4xMSwzLjkyYy0yLjUxLDEuNTMtNi4zNSwyLjczLTkuOCwyLjczLTUuNSwwLTYuNi0zLjA3LTUuODQtNy40MWwxLjExLTYuMzFjLjg5LTQuOSwzLjItNy44OCw5LjQ2LTcuODgsMy45NiwwLDYuNjUsMi4wNSw2LjY1LDUuNDEsMCwzLjcxLTIuNDMsNS44NC04LjEsNy41OC0yLjUxLjc3LTMuMDIuODktNCwxLjE1bC0uMTcuOThaTTM3MC43Miw4NS4yYzAtLjk0LS44MS0xLjYyLTIuMTctMS42Mi0yLjM0LDAtMy40OSwxLjQ1LTMuODMsMy40MWwtLjM4LDIuMTNjLjcyLS4yMSwxLjAyLS4zLDMuMTEtLjk0LDIuMy0uNzIsMy4yOC0xLjYyLDMuMjgtMi45OFoiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0zOTAuNjYsODQuMjZjLTIuNDMsMS4zMi0zLjk2LDIuMy02LjE4LDMuNzFsLTIuMjYsMTIuNzhoLTUuMTFsMy41OC0yMC4zMiw0LjQ3LS43Ny0uMjEsMy4wMmMxLjQ1LTEuMDcsMy41OC0yLjM0LDUuMzMtMy4wN2wuMzgsNC42NFoiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00MDMuMjMsMTAwLjc1bC0yLjk4LTIwLjI0LDUuMDctLjcyLDEuOTYsMTYuNDUsNC45LTExLjAzYy40Ny0xLjExLjYtMiwuNi0yLjg1LDAtLjY4LS4wOS0xLjI4LS4zLTEuOTZsNC45OC0uNzJjLjI2LjgxLjM4LDEuODMuMzgsMi42LDAsMS4wMi0uMTMsMi40Ny0uNzIsMy43MWwtNi44NiwxNC43OGgtNy4wM1oiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00MjQuMjMsOTQuN2MtLjIxLDEuMTktLjI2LDIuMjIsMS42MiwyLjIyLDIuMjIsMCw1LjI4LTEuMDIsNy45Ny0yLjM5bDEuMTEsMy45MmMtMi41MSwxLjUzLTYuMzUsMi43My05LjgsMi43My01LjUsMC02LjYtMy4wNy01Ljg0LTcuNDFsMS4xMS02LjMxYy44OS00LjksMy4yLTcuODgsOS40Ni03Ljg4LDMuOTYsMCw2LjY1LDIuMDUsNi42NSw1LjQxLDAsMy43MS0yLjQzLDUuODQtOC4xLDcuNTgtMi41MS43Ny0zLjAyLjg5LTQsMS4xNWwtLjE3Ljk4Wk00MzEuNjEsODUuMmMwLS45NC0uODEtMS42Mi0yLjE3LTEuNjItMi4zNCwwLTMuNDksMS40NS0zLjgzLDMuNDFsLS4zOCwyLjEzYy43Mi0uMjEsMS4wMi0uMywzLjExLS45NCwyLjMtLjcyLDMuMjgtMS42MiwzLjI4LTIuOThaIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDUxLjU1LDg0LjI2Yy0yLjQzLDEuMzItMy45NiwyLjMtNi4xOCwzLjcxbC0yLjI2LDEyLjc4aC01LjExbDMuNTgtMjAuMzIsNC40Ny0uNzctLjIxLDMuMDJjMS40NS0xLjA3LDMuNTgtMi4zNCw1LjMzLTMuMDdsLjM4LDQuNjRaIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDU1LDgwLjM4bDUuMjQtLjcyLTMuNzEsMjEuMDloLTUuMTFsMy41OC0yMC4zN1pNNDU2LjU3LDcxLjUybDUuMjQtLjcyLTEuMDIsNS43OS01LjI0Ljc3LDEuMDItNS44NFoiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00NzUuNjIsODQuMjZjLTIuNDMsMS4zMi0zLjk2LDIuMy02LjE4LDMuNzFsLTIuMjYsMTIuNzhoLTUuMTFsMy41OC0yMC4zMiw0LjQ3LS43Ny0uMjEsMy4wMmMxLjQ1LTEuMDcsMy41OC0yLjM0LDUuMzMtMy4wN2wuMzgsNC42NFoiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00NzkuMDcsODAuMzhsNS4yNC0uNzItMy43MSwyMS4wOWgtNS4xMWwzLjU4LTIwLjM3Wk00ODAuNjUsNzEuNTJsNS4yNC0uNzItMS4wMiw1Ljc5LTUuMjQuNzcsMS4wMi01Ljg0WiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTQ4Ni42NSw5Ni43OWwxMC44Mi0xMi43NGgtOC44MmwuNi00LjA1aDE0LjE5bC0uMDQsMy45Mi0xMC44NiwxMi43NGg4Ljk1bC0uNjgsNC4wOWgtMTMuOThsLS4xNy0zLjk2WiIvPgogICAgICA8L2c+CiAgICAgIDxnPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTU2Mi41OCw3My4zN3YyOC44NWM0LjEyLDMuMTgsOC42OSw1LjcyLDEzLjU4LDcuNTF2LTIxLjI0Yy01Ljc3LTMuNTEtMTAuNTEtOC43Ny0xMy41OC0xNS4xMloiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik01NTkuMzksMjIuNzNjMC0uOTIsMC0xLjg0LDAtMi43NywwLTIuMTEsMC00LjIxLDAtNi4zMiwwLTQuMDIsMC04LjA1LDAtMTIuMDcsMC0uMywwLS42MS0uMDItLjkxLDAtLjE4LS4xNS0uMzUtLjI5LS4zNi0uMjYtLjAxLS41Mi0uMDMtLjc4LS4wMy0zLjA4LjAxLTIuMDMuMDMtNS4xLjA0LTEuNzMsMC0zLjQ1LjAyLTUuMTguMDItLjIyLDAtLjQzLDAtLjY1LjAyLS4xMi4wMi0uMjUuMDctLjM0LjE1LS4xNi4xNC0uMy4zMS0uNDMuNDgtMS4yOSwxLjU5LTIuNzYsMi45OC00LjM2LDQuMjUtMS45LDEuNTEtMy45NCwyLjgyLTYuMDgsMy45Ni00LjUyLDIuNDMtOS4zLDQuMTgtMTQuMjcsNS40My0uMzQuMDgtLjY3LjE3LTEuMDEuMjUtLjIuMDUtLjMuMTctLjMxLjM2LS4wMS4yNi0uMDIuNTItLjAyLjc4LDAsNS4xNSwwLDEwLjMsMCwxNS40NSwwLC4yNi4wMi41Mi4wNi43NywwLC4wNi4xMS4xNS4xOC4xNi4xNy4wMi4zNC4wMS41MSwwLDIuNi0uMTcsNS4xNS0uNjUsNy42Ny0xLjI2LDMuMjgtLjc5LDYuNS0xLjgsOS42Ni0yLjk5LjI0LS4wOS40OC0uMTguNzMtLjI3LjI1LS4wOS40Ni4wMy40Ni4yNi4wMS44Mi4wMiwxLjY0LjAyLDIuNDcsMCwxMi40NiwwLDI0LjkyLDAsMzcuMzloLjAxYzAsMi43NywwLDUuNTQsMCw4LjMxLDAsMTAuMTcsMCwyMC4zNCwwLDMwLjUxLDAsLjM5LDAsLjc4LjAyLDEuMTcsMCwuMjQuMTcuNDMuMzkuNDMuMzUuMDEuNjkuMDEsMS4wNC4wMSwzLjk2LDAsNy45MiwwLDExLjg5LDAsMi45NiwwLDEuOCwwLDQuNzYsMCwxLjYzLDAsMS40My4xNywxLjQzLTEuNDcsMC01LjY3LDAtMTEuMzQsMC0xNy4wMSwwLS4zNSwwLS43LDAtMS4wNSwwLTEuMDQsMC0yLjA3LDAtMy4xMSwwLS4wMSwwLS4wMiwwLS4wM1YyMi44MXMwLS4wNSwwLS4wN1oiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik01ODIuOSwxMDYuMjRjMCwxLjY5LDEuODQsMy41Myw0LjQ4LDMuNTMsMS44NCwwLDMuMjMtMS40NywzLjIzLTMuNDVzLTIuMTMtMy45Ny00LjExLTMuOTdjLTEuODQsMC0zLjYsMS43Ni0zLjYsMy44OVoiLz4KICAgICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik02MjEuOSw4MS43Yy0xLjQ3LDAtNi41NCw2LjYxLTEwLjgsMTQuOTgtMy4wOCw2LjAyLTcuNzEsMTAuNTgtOS4yNSwxMC41OC0uMjksMC0uNTEtLjI5LS41MS0uNTksMC0zLjc1LDUuOC0xMS4wMiw1LjgtMTUuNTcsMC0yLjc5LTIuMDYtNi4wMi0zLjg5LTYuMDItLjczLDAtMS4wMy4yOS0xLjAzLjg4LDAsNi4wMi01Ljk1LDEzLTUuOTUsMTguODgsMCwyLjk0LDIuNzksNS4xNCw1LjI5LDUuMTRzNC43LTIuNjQsOC4zNy03LjJjLTMuODIsMTQuMTgtMTMuMzcsMzguMjctMjYuNTIsMzguMjctMi41NywwLTQuMTktMS4xOC00Ljk5LTEuMTgtLjM3LDAtLjczLjQ0LS43My44OCwwLC45NSwyLjcyLDIuOTQsNy4wNSwyLjk0LDIxLjc0LDAsMjcuMS0yNS43MSwzMC44NS00MS44NywzLjM4LTE0LjYyLDguMzctMTcuNTUsOC4zNy0xOC4wNywwLS41OS0uNTktMi4wNi0yLjA2LTIuMDZaIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNjU4LjExLDkzLjgyYy0uMjIsMC0uMzcuMjItLjY2LjU5LTQuMzMsNi4xNy0xMS44MywxNi4wOS0xMy43MywxNi4wOS0uNTksMC0xLjEtLjUxLTEuMS0xLjQ3LDAtMTEuMDIsMTUuNzktMzYuNTgsMTUuNzktNDQuOTUsMC0zLjc1LTIuMTMtNS45NS0yLjcyLTUuOTVzLS44OC41OS0uODgsMS42MmMtLjExLDcuMDctMTAuOTUsMjIuNDgtMTUuNzgsMzUuMDYtMi43MiwzLjczLTkuNDgsMTEuNzItMTEuMzIsMTEuNzItLjU5LDAtMS4yNS0uMzctMS4yNS0xLjYyLjE1LTUuNDQsNi41NC0xMS45Nyw2LjY4LTE4LjM2LDAtMS40LTEuMTctMi43Mi0xLjc2LTIuNzItLjUxLDAtLjczLjY2LTEuMjUsMS41NC00LjQ4LDcuNDItOS4zMywxMS4wOS05LjMzLDE2LjM4LDAsNC45MiwzLjc1LDcuNjQsNy4wNSw3LjY0LDIuNjQsMCw2LjMtMy44LDkuMTMtNy40Ni0uMTUuOTYtLjI0LDEuODgtLjI0LDIuNzYsMCw1Ljk1LDQuMDQsOC43NCw2LjYxLDguNzQsNC45OSwwLDEyLjEyLTExLjM4LDE1LjQyLTE2LjgyLjM3LS41OS41OS0xLjAzLjU5LTEuNDcsMC0uNTEtLjU5LTEuMzItMS4yNS0xLjMyWiIvPgogICAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTU5Mi44NiwxOS40N2MxOC44LDAsMzQuMSwxNi41LDM0LjEsMzYuNzgsMCw1LjQ2LTEuMTEsMTAuNjMtMy4xLDE1LjNoMTkuMTljMS4yOC00Ljg3LDEuOTctOS45OSwxLjk3LTE1LjMsMC0zMS4wMi0yMy40LTU2LjI1LTUyLjE2LTU2LjI1LTExLjI4LDAtMjEuNzMsMy44OS0zMC4yNywxMC40N3YyOC44NWM1LjY5LTExLjc5LDE3LjEyLTE5Ljg2LDMwLjI3LTE5Ljg2WiIvPgogICAgICA8L2c+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=';

const IPSReportRenderer = {

    // UIKit ikon mapping (emoji yerine)
    icons: {
        document: 'file-text',
        target: 'crosshairs',
        chart: 'graph',
        shield: 'lock',
        balance: 'thumbnails',
        grid: 'grid',
        warning: 'warning',
        check: 'check',
        info: 'info',
        settings: 'cog',
        calendar: 'calendar',
        user: 'user',
        users: 'users',
        clipboard: 'clipboard',
        list: 'list',
        search: 'search',
        edit: 'pencil',
        print: 'print',
        download: 'download',
        refresh: 'refresh',
        close: 'close',
        menu: 'menu',
        heart: 'heart',
        star: 'star',
        bolt: 'bolt',
        trending: 'arrow-up',
        arrow: 'chevron-right'
    },

    // Section icon mapping
    sectionIcons: {
        'scopeAndPurpose': 'file-text',
        'governance': 'users',
        'investmentObjectives': 'crosshairs',
        'riskAnalysis': 'graph',
        'constraints': 'lock',
        'assetAllocation': 'thumbnails',
        'investmentUniverse': 'grid',
        'riskManagement': 'warning',
        'participationFinance': 'heart',
        'behavioralFindings': 'user',
        'monitoringAndReporting': 'clipboard',
        'reviewAndApproval': 'check'
    },

    // Düzenleme modu
    editMode: false,
    changedFields: {},
    pdfInProgress: false,

    /**
     * Tam IPS raporu render et
     */
    renderFullReport: function (ipsData, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('IPS Report container not found:', containerId);
            return;
        }

        if (this.isV3Data(ipsData)) {
            return this.renderFullReportV3(ipsData, containerId);
        }

        // Expert AI içeriklerini PROFİL BAZLI oluştur (backend tutarsızlığını önle)
        const profile = ipsData.riskAnalysis?.content?.overallProfile || {};
        const profileType = profile.profile || ipsData.metadata?.riskProfile || 'medium';
        const profileScore = profile.score || profile.normalizedScore || 50;

        try {
            this.expertContent = this.generateConsistentExpertContent(profileType, profileScore, ipsData);
        } catch (e) {
            console.error('[IPS Renderer] Expert content oluşturma hatası:', e);
            this.expertContent = {};
        }
        console.log('[IPS Renderer] Profil bazlı expert content oluşturuldu: ' + profileType + ' (skor: ' + profileScore + ')');

        // Her bölümü ayrı ayrı render et, hata olursa o bölümü atla
        const safeRender = (fn, label) => {
            try {
                return fn();
            } catch (e) {
                console.error('[IPS Renderer] Bölüm hatası (' + label + '):', e);
                return '<div style="padding:12px;background:#fff3cd;border:1px solid #ffc107;border-radius:4px;margin:8px 0;"><strong>' + label + '</strong> render edilemedi: ' + (e.message || e) + '</div>';
            }
        };

        const html = `
            <div class="ips-full-report" id="ipsFullReport">
                ${safeRender(() => this.renderToolbar(ipsData), 'Toolbar')}
                ${safeRender(() => this.renderCoverPage(ipsData), 'Kapak')}
                ${safeRender(() => this.renderTableOfContents(ipsData), 'İçindekiler')}
                ${safeRender(() => this.renderScopeSection(ipsData.scopeAndPurpose), '1. Kapsam')}
                ${safeRender(() => this.renderGovernanceSection(ipsData.governance), '2. Yönetişim')}
                ${safeRender(() => this.renderObjectivesSection(ipsData.investmentObjectives), '3. Hedefler')}
                ${safeRender(() => this.renderRiskAnalysisSection(ipsData.riskAnalysis), '4. Risk Analizi')}
                ${safeRender(() => this.renderConstraintsSection(ipsData.constraints), '5. Kısıtlamalar')}
                ${safeRender(() => this.renderAssetAllocationSection(ipsData.assetAllocation), '6. Varlık Tahsisi')}
                ${safeRender(() => this.renderInvestmentUniverseSection(ipsData.investmentUniverse), '7. Yatırım Evreni')}
                ${safeRender(() => this.renderRiskManagementSection(ipsData.riskManagement), '8. Risk Yönetimi')}
                ${safeRender(() => this.renderParticipationFinanceSection(ipsData.participationFinance), '9. Katılım Finans')}
                ${safeRender(() => this.renderBehavioralSection(ipsData.behavioralFindings), '10. Davranışsal')}
                ${safeRender(() => this.renderMonitoringSection(ipsData.monitoringAndReporting), '11. İzleme')}
                ${safeRender(() => this.renderApprovalSection(ipsData.reviewAndApproval), '12. Onay')}
            </div>
        `;

        container.innerHTML = html;
        this.attachEventListeners();
        this.applySavedCustomizations();
        this.applySavedSignatures();

        // Chart'ları render et
        setTimeout(() => {
            try {
                this.renderCharts();
            } catch (e) {
                console.warn('[IPS Renderer] Chart render hatası:', e);
            }
        }, 100);

        return this;
    },

    isV3Data: function (ipsData) {
        if (!ipsData) return false;
        const version = ipsData.metadata?.version || '';
        if (String(version).startsWith('3')) return true;
        if (Array.isArray(ipsData.sections)) return true;
        return false;
    },

    /**
     * V3 IPS raporu render et
     */
    renderFullReportV3: function (ipsData, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('IPS Report container not found:', containerId);
            return;
        }

        const html = `
            <div class="ips-full-report" id="ipsFullReport">
                ${this.renderToolbar(ipsData)}
                ${this.renderLLMStatusBannerV3()}
                ${this.renderCoverPageV3(ipsData)}
                ${this.renderTableOfContentsV3(ipsData)}
                ${this.renderComponentsTableV3(ipsData)}
                ${this.renderSectionDetailsV3(ipsData)}
            </div>
        `;

        container.innerHTML = html;
        this.attachEventListeners();
        this.applySavedCustomizations();
        this.applySavedSignatures();
        return this;
    },
    renderLLMStatusBannerV3: function () {
        return `<div class="ips-llm-status" id="ipsLLMStatus" style="display:none;"></div>`;
    },

    renderCoverPageV3: function (ipsData) {
        const meta = ipsData.metadata || {};
        const riskProfile = this.escapeHtml(meta.riskProfile || 'medium');
        const riskScore = meta.riskScore ?? '-';
        const generatedAt = meta.generatedAt ? this.formatDate(meta.generatedAt) : this.formatDate(new Date().toISOString());
        const nextReviewAt = meta.nextReviewAt ? this.formatDate(meta.nextReviewAt) : this.formatDate(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString());

        return `
            <div class="ips-cover-page" id="ipsCover">
                <div class="ips-cover-brand">
                    <img src="${IPS_LOGO_BASE64}" alt="Kuveyt Türk Portföy" class="ips-cover-logo">
                    <div class="ips-cover-brand-text">
                        <div class="ips-cover-brand-title">Kuveyt Türk Portföy</div>
                        <div class="ips-cover-brand-sub">Kurumsal Yatırım Politikası Beyanı</div>
                    </div>
                </div>
                <h1 class="ips-cover-title">YATIRIM POLİTİKASI BEYANI</h1>
                <p class="ips-cover-subtitle">Investment Policy Statement (IPS)</p>

                <div class="ips-profile-badge">
                    <div class="ips-profile-level">${riskProfile.toUpperCase()}</div>
                    <div class="ips-profile-score">Risk Skoru: ${riskScore}/100</div>
                </div>

                <div style="margin-top: 32px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 420px; margin-left: auto; margin-right: auto;">
                    <div style="text-align: left;">
                        <div style="font-size: 0.75rem; opacity: 0.7; margin-bottom: 4px;">Değerlendirme Tarihi</div>
                        <div style="font-size: 1rem; font-weight: 600;">${generatedAt}</div>
                    </div>
                    <div style="text-align: left;">
                        <div style="font-size: 0.75rem; opacity: 0.7; margin-bottom: 4px;">Sonraki Gözden Geçirme</div>
                        <div style="font-size: 1rem; font-weight: 600;">${nextReviewAt}</div>
                    </div>
                </div>
            </div>
        `;
    },

    renderTableOfContentsV3: function (ipsData) {
        const sections = Array.isArray(ipsData.sections) ? ipsData.sections : [];
        const items = sections.map((section, idx) => `
            <li class="ips-toc-item">
                <a href="#ips-section-${this.escapeHtml(section.id || String(idx))}" class="ips-toc-link" uk-scroll>
                    <strong>${idx + 1}.</strong> ${this.escapeHtml(section.title || 'Bölüm')}
                </a>
                <span class="ips-toc-number">${idx + 1}</span>
            </li>
        `).join('');

        return `
            <div class="ips-toc" id="ips-toc">
                <h3 class="ips-toc-title">
                    <span uk-icon="icon: list; ratio: 1.2"></span>
                    İçindekiler
                </h3>
                <ul class="ips-toc-list">
                    ${items}
                </ul>
            </div>
        `;
    },

    renderComponentsTableV3: function (ipsData) {
        const sections = Array.isArray(ipsData.sections) ? ipsData.sections : [];

        const rows = sections.map((section) => {
            const content = section.content || {};
            const summary = content.summary ? `<div class="uk-text-small">${this.escapeHtml(content.summary)}</div>` : '<div class="uk-text-muted">-</div>';
            const keyParams = Array.isArray(content.keyParameters) && content.keyParameters.length
                ? `<ul class="uk-list uk-list-bullet uk-margin-remove">${content.keyParameters.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}</ul>`
                : '<div class="uk-text-muted">-</div>';
            const purpose = Array.isArray(content.purposeAndBenefits) && content.purposeAndBenefits.length
                ? `<ul class="uk-list uk-list-bullet uk-margin-remove">${content.purposeAndBenefits.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}</ul>`
                : '<div class="uk-text-muted">-</div>';
            const stakeholders = Array.isArray(content.stakeholders) && content.stakeholders.length
                ? this.escapeHtml(content.stakeholders.join(', '))
                : '-';
            const review = this.escapeHtml(content.reviewFrequency || '-');
            const sources = Array.isArray(section.linkedQuestions) && section.linkedQuestions.length
                ? this.escapeHtml(section.linkedQuestions.map(q => String(q).toUpperCase()).join(', '))
                : 'Sabit';

            return `
                <tr>
                    <td><strong>${this.escapeHtml(section.title || '-')}</strong></td>
                    <td>${this.escapeHtml(section.description || '-')}</td>
                    <td>${summary}${keyParams}</td>
                    <td>${purpose}</td>
                    <td>${stakeholders}</td>
                    <td>${review}</td>
                    <td>${sources}</td>
                </tr>
            `;
        }).join('');

        return `
            <div class="ips-section uk-card uk-card-default uk-card-body uk-margin-bottom" id="ips-components-table">
                <h3 class="uk-card-title">
                    <span uk-icon="icon: grid; ratio: 1" class="uk-text-primary"></span> IPS Temel Bileşenler
                </h3>
                <div class="uk-overflow-auto">
                    <table class="uk-table uk-table-divider uk-table-small ips-components-table">
                        <thead>
                            <tr>
                                <th>Bileşen Adı</th>
                                <th>Açıklama</th>
                                <th>Temel İçerik ve Parametreler</th>
                                <th>Fayda ve Amaç</th>
                                <th>İlgili Paydaşlar</th>
                                <th>Gözden Geçirme Sıklığı</th>
                                <th>Kaynak</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows || ''}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderSectionDetailsV3: function (ipsData) {
        const sections = Array.isArray(ipsData.sections) ? ipsData.sections : [];
        const cards = sections.map((section, idx) => {
            const content = section.content || {};
            const keyParams = Array.isArray(content.keyParameters) ? content.keyParameters : [];
            const benefits = Array.isArray(content.purposeAndBenefits) ? content.purposeAndBenefits : [];
            const stakeholders = Array.isArray(content.stakeholders) ? content.stakeholders : [];
            const linked = Array.isArray(section.linkedQuestions) ? section.linkedQuestions : [];
            const extras = section.details || section.strategicRanges || section.tacticalRanges || null;

            const extrasHtml = extras ? this.renderSectionExtrasV3(section) : '';
            const fundHtml = section.id === 'allocation' ? this.renderFundRecommendationsV3(section) : '';
            const approvalHtml = section.id === 'approval' ? this.renderApprovalSectionV3(section) : '';

            return `
                <div class="ips-section uk-card uk-card-default uk-card-body uk-margin-bottom" id="ips-section-${this.escapeHtml(section.id || String(idx))}">
                    <h3 class="uk-card-title">${this.escapeHtml(section.title || 'Bölüm')}</h3>
                    <p class="uk-text-muted">${this.escapeHtml(section.description || '')}</p>
                    <p>${this.escapeHtml(content.summary || '')}</p>
                    ${keyParams.length ? `<h5>Temel Parametreler</h5><ul class="uk-list uk-list-bullet">${keyParams.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}</ul>` : ''}
                    ${benefits.length ? `<h5>Fayda ve Amaç</h5><ul class="uk-list uk-list-bullet">${benefits.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}</ul>` : ''}
                    ${stakeholders.length ? `<p><strong>İlgili Paydaşlar:</strong> ${this.escapeHtml(stakeholders.join(', '))}</p>` : ''}
                    ${content.reviewFrequency ? `<p><strong>Gözden Geçirme:</strong> ${this.escapeHtml(content.reviewFrequency)}</p>` : ''}
                    ${linked.length ? `<p><strong>Kaynak:</strong> ${this.escapeHtml(linked.map(q => String(q).toUpperCase()).join(', '))}</p>` : ''}
                    ${extrasHtml}
                    ${fundHtml}
                    ${approvalHtml}
                </div>
            `;
        }).join('');

        return `
            <div class="ips-section uk-margin-bottom" id="ips-v3-details">
                ${cards}
            </div>
        `;
    },

    renderApprovalSectionV3: function (section) {
        const declarationText = 'Bu Yatırım Politikası Beyanı\'nı okudum, anladım ve kabul ediyorum.';
        const today = this.formatDate(new Date());

        return `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Beyan</h4>
                <div class="ips-info-panel">
                    <p>${this.escapeHtml(declarationText)}</p>
                </div>
            </div>

            <div class="ips-signature-area">
                <div class="ips-signature-box" id="investorSignatureBox">
                    <div class="ips-signature-placeholder" id="investorSignaturePlaceholder" style="min-height: 120px; display: flex; align-items: flex-end; justify-content: center; position: relative;">
                         <div id="investorSignatureContainer" style="display: none; width: 100%; height: 100%;">
                            <img id="investorSignatureImage" src="" alt="İmza" style="max-height: 80px; max-width: 100%;">
                            <button class="ips-btn ips-btn--icon ips-btn--xs no-print" onclick="IPSReportRenderer.removeSignature('investor')" style="position: absolute; top: 0; right: 0; background: #fff; border: 1px solid #ccc;">
                                <span uk-icon="icon: trash; ratio: 0.7"></span>
                            </button>
                         </div>
                         <div class="ips-signature-line" id="investorSignatureLine"></div>

                         <button class="ips-btn ips-btn--outline ips-btn--sm no-print" id="addInvestorSignatureBtn" onclick="IPSReportRenderer.openSignatureModal('investor')" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                            <span uk-icon="icon: pencil; ratio: 0.8"></span>
                            İmza Ekle
                         </button>
                    </div>

                    <div class="ips-signature-label">Yatırımcı İmzası</div>
                    <div class="ips-editable ips-input uk-margin-small-top" data-field="approval.investorName" style="text-align: center;">
                        İsim Soyisim
                    </div>
                    <div style="margin-top: 8px; color: var(--ips-text-muted);">
                        Tarih: ${today}
                    </div>
                </div>

                <div class="ips-signature-box" id="employeeSignatureBox">
                    <div class="ips-signature-placeholder" id="employeeSignaturePlaceholder" style="min-height: 120px; display: flex; align-items: flex-end; justify-content: center; position: relative;">
                        <div id="employeeSignatureContainer" style="display: none; width: 100%; height: 100%;">
                            <img id="employeeSignatureImage" src="" alt="İmza" style="max-height: 80px; max-width: 100%;">
                            <button class="ips-btn ips-btn--icon ips-btn--xs no-print" onclick="IPSReportRenderer.removeSignature('employee')" style="position: absolute; top: 0; right: 0; background: #fff; border: 1px solid #ccc;">
                                <span uk-icon="icon: trash; ratio: 0.7"></span>
                            </button>
                        </div>
                        <div class="ips-signature-line" id="employeeSignatureLine"></div>
                        <button class="ips-btn ips-btn--outline ips-btn--sm no-print" id="addEmployeeSignatureBtn" onclick="IPSReportRenderer.openSignatureModal('employee')" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                            <span uk-icon="icon: pencil; ratio: 0.8"></span>
                            İmza Ekle
                        </button>
                    </div>
                    <div class="ips-signature-label">Kuveyt Türk Portföy Yetkilisi</div>
                    <div class="ips-editable ips-input uk-margin-small-top" data-field="approval.employeeName" style="text-align: center;">
                        Ad Soyad
                    </div>
                    <div class="ips-editable ips-input uk-margin-small-top" data-field="approval.employeeTitle" style="text-align: center;">
                        Ünvan / Görev
                    </div>
                    <div style="margin-top: 8px; color: var(--ips-text-muted);">
                        Tarih: ${today}
                    </div>
                </div>
            </div>

            <div id="signatureModal" class="uk-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; background: rgba(0,0,0,0.5);">
                <div class="uk-modal-dialog uk-modal-body" style="background: white; width: 500px; max-width: 90%; margin: 50px auto; padding: 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                    <h2 class="uk-modal-title" style="font-size: 1.25rem; font-weight: 600; margin-bottom: 16px;">İmza Ekle</h2>
                    
                    <div style="margin-bottom: 16px;">
                        <ul uk-tab style="display: flex; gap: 16px; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 16px;">
                            <li class="uk-active"><a href="#" onclick="IPSReportRenderer.switchSignatureTab('draw')">Çiz</a></li>
                            <li><a href="#" onclick="IPSReportRenderer.switchSignatureTab('upload')">Yükle</a></li>
                        </ul>

                        <div id="tab-draw" style="display: block;">
                            <div style="border: 1px dashed #ccc; background: #f8f9fa; border-radius: 4px;">
                                <canvas id="signaturePad" width="450" height="200" style="width: 100%; height: 200px; touch-action: none;"></canvas>
                            </div>
                            <div style="text-align: right; margin-top: 8px;">
                                <button class="ips-btn ips-btn--xs ips-btn--outline" onclick="IPSReportRenderer.clearSignaturePad()">Temizle</button>
                            </div>
                        </div>

                        <div id="tab-upload" style="display: none;">
                            <div class="js-upload uk-placeholder uk-text-center" style="border: 1px dashed #ccc; padding: 32px; background: #f8f9fa; border-radius: 4px;">
                                <span uk-icon="icon: cloud-upload"></span>
                                <span class="uk-text-middle">Bir imza görseli sürükleyin veya</span>
                                <div uk-form-custom>
                                    <input type="file" id="signatureFileInput" accept="image/*" onchange="IPSReportRenderer.handleSignatureUpload(this)">
                                    <span class="uk-link">seçin</span>
                                </div>
                            </div>
                            <div id="uploadPreview" style="display: none; margin-top: 16px; text-align: center;">
                                <img id="uploadPreviewImg" src="" style="max-height: 150px; border: 1px solid #eee;">
                            </div>
                        </div>
                    </div>

                    <div class="uk-text-right" style="margin-top: 24px;">
                        <button class="ips-btn ips-btn--outline uk-modal-close" onclick="IPSReportRenderer.closeSignatureModal()">İptal</button>
                        <button class="ips-btn ips-btn--primary" onclick="IPSReportRenderer.saveSignature()">Kaydet</button>
                    </div>
                </div>
            </div>

            <div class="uk-margin-large-top uk-text-center no-print">
                <p style="font-size: 0.85rem; color: var(--ips-text-muted);">
                    Bu belge elektronik ortamda oluşturulmuştur.
                    <br>Belge Referans No: IPS-${Date.now().toString(36).toUpperCase()}
                </p>
            </div>
        `;
    },

    renderFundRecommendationsV3: function (section) {
        const details = section.details || {};
        const singleFund = details.singleFundRecommendation;
        const fundAllocation = Array.isArray(details.fundAllocation) ? details.fundAllocation : [];
        const monthlyReport = details.monthlyReportLink;
        const recommendationNote = details.fundRecommendationNote;
        const recommendationInsight = details.recommendationInsight;
        const recommendationFactors = Array.isArray(details.recommendationFactors) ? details.recommendationFactors : [];

        if (!singleFund && fundAllocation.length === 0 && !monthlyReport) return '';

        const formatPercent = (value) => {
            const num = typeof value === 'number'
                ? value
                : parseFloat(String(value).replace(',', '.'));
            if (!Number.isFinite(num)) return '';
            const fixed = num.toFixed(2);
            return fixed.replace(/\.00$/, '');
        };

        const clampPercent = (value) => {
            const num = typeof value === 'number'
                ? value
                : parseFloat(String(value).replace(',', '.'));
            if (!Number.isFinite(num)) return 0;
            return Math.min(100, Math.max(0, num));
        };

        const headingHtml = `
            <div class="ips-fund-recommendations__heading">Sizin İçin Önerilerimiz</div>
        `;
        const noteHtml = recommendationNote ? `
            <div class="ips-fund-recommendations__note">${this.escapeHtml(recommendationNote)}</div>
        ` : '';
        const insightHtml = recommendationInsight ? `
            <div class="ips-fund-insight">
                <div class="ips-fund-insight__title">Öneri Mantığı (AI)</div>
                <p class="ips-fund-insight__summary">${this.escapeHtml(recommendationInsight)}</p>
                ${recommendationFactors.length ? `
                    <ul class="ips-fund-insight__list">
                        ${recommendationFactors.map(item => `<li>${this.escapeHtml(item)}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        ` : '';

        const singleFundHtml = singleFund ? `
            <div class="ips-fund-card">
                <div class="ips-fund-card__header">
                    <div>
                        <div class="ips-fund-card__label">Tek Fonla Pratik Yatırım</div>
                        <div class="ips-fund-card__code">${this.escapeHtml(singleFund.code || '')}</div>
                        <div class="ips-fund-card__name">${this.escapeHtml(singleFund.name || '')}</div>
                    </div>
                    <div class="ips-fund-card__risk">
                        <div class="ips-fund-card__risk-score">${this.escapeHtml(singleFund.riskLevel || '')}</div>
                        <div class="ips-fund-card__risk-label">${this.escapeHtml(singleFund.riskLabel || '')}</div>
                    </div>
                </div>
                <div class="ips-fund-card__metrics">
                    <div>
                        <div class="ips-fund-card__metric-label">Aylık Getiri</div>
                        <div class="ips-fund-card__metric-value">${this.escapeHtml(singleFund.monthlyReturn || '-')}</div>
                    </div>
                    <div>
                        <div class="ips-fund-card__metric-label">Yıllık Getiri</div>
                        <div class="ips-fund-card__metric-value">${this.escapeHtml(singleFund.yearlyReturn || '-')}</div>
                    </div>
                </div>
                ${singleFund.url ? `<a class="ips-fund-card__link" href="${this.escapeHtml(singleFund.url)}" target="_blank" rel="noopener">Fona Git</a>` : ''}
            </div>
        ` : '';

        const allocationHtml = fundAllocation.length ? `
            <div class="ips-fund-allocation">
                <div class="ips-fund-allocation__title">Fon Dağılım Önerileri</div>
                <div class="ips-fund-allocation__list">
                    ${fundAllocation.map((item) => `
                        <div class="ips-fund-allocation__row">
                            <span class="ips-fund-allocation__dot" style="background:${this.escapeHtml(item.color || '#186149')}"></span>
                            <div class="ips-fund-allocation__meta">
                                <span class="ips-fund-allocation__code">${this.escapeHtml(item.code || '')}</span>
                                ${item.name && item.name !== item.code ? `<span class="ips-fund-allocation__name">${this.escapeHtml(item.name)}</span>` : ''}
                                <div class="ips-fund-allocation__bar" aria-hidden="true">
                                    <span class="ips-fund-allocation__bar-fill" style="width:${this.escapeHtml(String(clampPercent(item.weight)))}%"></span>
                                </div>
                            </div>
                            <span class="ips-fund-allocation__value">%${this.escapeHtml(formatPercent(item.weight) || String(item.weight || ''))}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        const monthlyHtml = monthlyReport ? `
            <div class="ips-fund-monthly">
                <div class="ips-fund-monthly__title">${this.escapeHtml(monthlyReport.label || 'Aylık Fon Dağılım Önerileri')}</div>
                <div class="ips-fund-monthly__desc">${this.escapeHtml(monthlyReport.description || '')}</div>
                ${monthlyReport.url ? `<a class="ips-fund-monthly__link" href="${this.escapeHtml(monthlyReport.url)}" target="_blank" rel="noopener">Keşfet</a>` : ''}
            </div>
        ` : '';

        return `
            <div class="ips-fund-recommendations">
                ${headingHtml}
                ${noteHtml}
                ${insightHtml}
                ${singleFundHtml}
                ${allocationHtml}
                ${monthlyHtml}
            </div>
        `;
    },

    renderSectionExtrasV3: function (section) {
        const blocks = [];

        const formatValue = (value) => {
            if (Array.isArray(value)) return value.join(', ');
            if (value && typeof value === 'object') return JSON.stringify(value);
            return String(value);
        };

        if (section.strategicRanges && typeof section.strategicRanges === 'object') {
            const rows = Object.entries(section.strategicRanges).map(([key, value]) => `
                <li><strong>${this.escapeHtml(key)}:</strong> ${this.escapeHtml(formatValue(value))}</li>
            `).join('');
            if (rows) blocks.push(`<h5>Stratejik Dağılım</h5><ul class="uk-list uk-list-bullet">${rows}</ul>`);
        }

        if (section.tacticalRanges && typeof section.tacticalRanges === 'object') {
            const rows = Object.entries(section.tacticalRanges).map(([key, value]) => `
                <li><strong>${this.escapeHtml(key)}:</strong> ${this.escapeHtml(formatValue(value))}</li>
            `).join('');
            if (rows) blocks.push(`<h5>Taktik Dağılım</h5><ul class="uk-list uk-list-bullet">${rows}</ul>`);
        }

        if (section.details && typeof section.details === 'object') {
            let detailsSource = section.details;
            if (section.id === 'allocation') {
                const filtered = { ...detailsSource };
                delete filtered.singleFundRecommendation;
                delete filtered.fundAllocation;
                delete filtered.monthlyReportLink;
                delete filtered.fundRecommendationNote;
                delete filtered.recommendationInsight;
                delete filtered.recommendationFactors;
                delete filtered.portfolioData;
                detailsSource = filtered;
            }

            const orderedKeys = [
                'liquidityNeeds',
                'ethicalESG',
                'productRestrictions',
                'benchmarks',
                'reportingCadence',
                'triggerRules',
                'managerCriteria',
                'watchlistTriggers'
            ];
            const labelMap = {
                liquidityNeeds: 'Likidite İhtiyacı',
                ethicalESG: 'Etik/ESG Tercihleri',
                productRestrictions: 'Ürün Kısıtları',
                benchmarks: 'Benchmarklar',
                reportingCadence: 'Raporlama Sıklığı',
                triggerRules: 'Yeniden Dengeleme Tetikleyicileri',
                managerCriteria: 'Yönetici Seçim Kriterleri',
                watchlistTriggers: 'Watchlist Tetikleyicileri'
            };
            const rows = [];

            orderedKeys.forEach((key) => {
                if (detailsSource[key] !== undefined) {
                    rows.push(`<li><strong>${this.escapeHtml(labelMap[key] || key)}:</strong> ${this.escapeHtml(formatValue(detailsSource[key]))}</li>`);
                }
            });

            Object.entries(detailsSource).forEach(([key, value]) => {
                if (orderedKeys.includes(key)) return;
                rows.push(`<li><strong>${this.escapeHtml(labelMap[key] || key)}:</strong> ${this.escapeHtml(formatValue(value))}</li>`);
            });

            if (rows.length) blocks.push(`<h5>Detaylar</h5><ul class="uk-list uk-list-bullet">${rows.join('')}</ul>`);
        }

        return blocks.join('');
    },

    /**
     * Toolbar render
     */
    renderToolbar: function (ipsData) {
        return `
            <div class="ips-toolbar no-print" id="ipsToolbar">
                <div class="ips-toolbar-title">
                    <span uk-icon="icon: file-text; ratio: 1.2"></span>
                    Yatırım Politikası Beyanı
                </div>
                <div class="ips-toolbar-actions">
                    <button class="ips-btn ips-btn--outline ips-btn--sm" onclick="IPSReportRenderer.toggleEditMode()" id="editModeBtn">
                        <span uk-icon="icon: pencil; ratio: 0.8"></span>
                        <span class="edit-btn-text">Düzenle</span>
                    </button>
                    <button class="ips-btn ips-btn--outline ips-btn--sm" onclick="IPSReportRenderer.exportPDF()">
                        <span uk-icon="icon: download; ratio: 0.8"></span>
                        PDF
                    </button>
                    <button class="ips-btn ips-btn--outline ips-btn--sm" onclick="IPSReportRenderer.printReport()">
                        <span uk-icon="icon: print; ratio: 0.8"></span>
                        Yazdır
                    </button>
                    <button class="ips-btn ips-btn--primary ips-btn--sm" onclick="IPSReportRenderer.saveChanges()" id="saveBtn" style="display: none;">
                        <span uk-icon="icon: check; ratio: 0.8"></span>
                        Kaydet
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * Kapak sayfası - Profesyonel Tasarım
     */
    renderCoverPage: function (ipsData) {
        const meta = ipsData.metadata || {};
        const profile = ipsData.riskAnalysis?.content?.overallProfile || {};
        const riskLevel = profile.classification?.level || 'Risk Profili';
        const riskScore = meta.riskScore || '-';

        // Logo SVG base64 encoded - TAM LOGO
        const logoBase64 = IPS_LOGO_BASE64;

        return `
            <div class="ips-cover-page" id="ipsCover">
                <!-- Logo -->
                <div style="margin-bottom: 40px; text-align: center;">
                    <img src="${logoBase64}" 
                         alt="Kuveyt Türk Portföy" 
                         class="ips-cover-logo"
                         style="height: 80px; width: auto; max-width: 500px;">
                </div>
                
                <!-- Ana Başlık -->
                <h1 class="ips-cover-title">YATIRIM POLİTİKASI BEYANI</h1>
                <p class="ips-cover-subtitle">Investment Policy Statement (IPS)</p>
                
                <!-- Risk Profil Badge -->
                <div class="ips-profile-badge">
                    <div class="ips-profile-level">${this.escapeHtml(riskLevel)}</div>
                    <div class="ips-profile-score">Risk Skoru: ${riskScore}/100</div>
                </div>
                
                <!-- Tarih Bilgileri -->
                <div style="margin-top: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 400px; margin-left: auto; margin-right: auto;">
                    <div style="text-align: left;">
                        <div style="font-size: 0.75rem; opacity: 0.7; margin-bottom: 4px;">Değerlendirme Tarihi</div>
                        <div style="font-size: 1rem; font-weight: 600;">${this.formatDate(meta.generatedDate)}</div>
                    </div>
                    <div style="text-align: left;">
                        <div style="font-size: 0.75rem; opacity: 0.7; margin-bottom: 4px;">Sonraki Gözden Geçirme</div>
                        <div style="font-size: 1rem; font-weight: 600;">${this.formatDate(meta.nextReviewDate)}</div>
                    </div>
                </div>
                
                <!-- Doküman Numarası -->
                <div style="margin-top: 48px; padding: 16px 24px; background: rgba(255,255,255,0.1); border-radius: 8px; display: inline-block;">
                    <div style="font-size: 0.75rem; opacity: 0.7;">Doküman No</div>
                    <div style="font-size: 0.9rem; font-weight: 500; font-family: monospace;">IPS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}</div>
                </div>
                
                <!-- Footer -->
                <div style="margin-top: 60px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.2); font-size: 0.8rem; opacity: 0.7;">
                    <p style="margin: 0;">CFA Institute IPS standartları ve SPK düzenlemelerine uygun olarak hazırlanmıştır.</p>
                    <p style="margin: 8px 0 0 0;">© ${new Date().getFullYear()} Kuveyt Türk Portföy Yönetimi A.Ş. - Tüm hakları saklıdır.</p>
                </div>
            </div>
        `;
    },

    /**
     * İçindekiler
     */
    renderTableOfContents: function (ipsData) {
        const sections = [
            { num: '1', title: 'Kapsam ve Amaç', id: 'ips-scope', icon: 'file-text' },
            { num: '2', title: 'Yönetişim', id: 'ips-governance', icon: 'users' },
            { num: '3', title: 'Yatırım Hedefleri', id: 'ips-objectives', icon: 'crosshairs' },
            { num: '4', title: 'Risk Profili Analizi', id: 'ips-risk-analysis', icon: 'graph' },
            { num: '5', title: 'Kısıtlamalar', id: 'ips-constraints', icon: 'lock' },
            { num: '6', title: 'Varlık Tahsisi Politikası', id: 'ips-allocation', icon: 'thumbnails' },
            { num: '7', title: 'Yatırım Evreni', id: 'ips-universe', icon: 'grid' },
            { num: '8', title: 'Risk Yönetimi', id: 'ips-risk-management', icon: 'warning' },
            { num: '9', title: 'Katılım Finans İlkeleri', id: 'ips-participation', icon: 'heart' },
            { num: '10', title: 'Davranışsal Bulgular', id: 'ips-behavioral', icon: 'user' },
            { num: '11', title: 'İzleme ve Raporlama', id: 'ips-monitoring', icon: 'clipboard' },
            { num: '12', title: 'Gözden Geçirme ve Onay', id: 'ips-approval', icon: 'check' }
        ];

        const tocItems = sections.map(s => `
            <li class="ips-toc-item">
                <a href="#${s.id}" class="ips-toc-link" uk-scroll>
                    <span uk-icon="icon: ${s.icon}; ratio: 0.8" style="margin-right: 8px; color: var(--ips-primary);"></span>
                    <strong>${s.num}.</strong> ${s.title}
                </a>
                <span class="ips-toc-number">${s.num}</span>
            </li>
        `).join('');

        return `
            <div class="ips-toc" id="ips-toc">
                <h3 class="ips-toc-title">
                    <span uk-icon="icon: list; ratio: 1.2"></span>
                    İçindekiler
                </h3>
                <ul class="ips-toc-list">
                    ${tocItems}
                </ul>
            </div>
        `;
    },

    /**
     * Section wrapper
     */
    renderSection: function (id, title, icon, content, sectionNumber) {
        return `
            <div class="ips-section" id="${id}">
                <div class="ips-section-header">
                    <h3 class="ips-section-title">
                        <span class="ips-section-icon">
                            <span uk-icon="icon: ${icon}; ratio: 1"></span>
                        </span>
                        ${sectionNumber}. ${title}
                    </h3>
                    <div class="ips-section-actions no-print">
                        <button class="ips-btn ips-btn--icon ips-btn--outline" 
                                onclick="IPSReportRenderer.collapseSection('${id}')"
                                title="Bölümü Daralt">
                            <span uk-icon="icon: chevron-up; ratio: 0.8"></span>
                        </button>
                    </div>
                </div>
                <div class="ips-section-body" id="${id}-body">
                    ${content}
                </div>
            </div>
        `;
    },

    /**
     * Bölüm 1: Kapsam ve Amaç
     */
    renderScopeSection: function (section) {
        if (!section) return '';
        const c = section.content;

        // Expert AI yatırımcı profili içeriği
        const aiProfile = this.expertContent?.investor_profile || null;

        // AI içeriği varsa öne çıkar
        const aiProfileContent = aiProfile ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Yatırımcı Profili Özeti</h4>
                <div class="ips-ai-content" style="padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                        <strong style="font-size: 0.85rem; color: var(--ips-primary);">AI Analizi</strong>
                    </div>
                    <p style="margin: 0; line-height: 1.7; font-size: 1.05rem;">${this.escapeHtml(aiProfile.summary || '')}</p>
                </div>
            </div>

            ${aiProfile.demographics_analysis ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Demografik Analiz</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiProfile.demographics_analysis)}</p>
            </div>
            ` : ''}

            ${aiProfile.investment_personality ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Yatırımcı Kişiliği</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiProfile.investment_personality)}</p>
            </div>
            ` : ''}

            <div class="ips-grid ips-grid--2" style="margin-top: 16px;">
                ${aiProfile.strengths && aiProfile.strengths.length > 0 ? `
                <div class="ips-info-panel" style="background: #e8f5e9; border-left: 4px solid #4caf50;">
                    <strong style="color: #2e7d32;">Güçlü Yönler</strong>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                        ${aiProfile.strengths.map(s => `<li>${this.escapeHtml(s)}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                ${aiProfile.attention_points && aiProfile.attention_points.length > 0 ? `
                <div class="ips-info-panel" style="background: #fff3e0; border-left: 4px solid #ff9800;">
                    <strong style="color: #e65100;">Dikkat Edilmesi Gerekenler</strong>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                        ${aiProfile.attention_points.map(a => `<li>${this.escapeHtml(a)}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        ` : '';

        const content = `
            ${aiProfileContent}

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.purpose.title}</h4>
                <p class="ips-editable" data-field="scope.purpose.text">${this.escapeHtml(c.purpose.text)}</p>

                <div class="ips-info-panel uk-margin-top">
                    <strong>Bu beyanın önemi:</strong>
                    <ul class="ips-list uk-margin-small-top">
                        ${(c.purpose.importance || []).map(item => `
                            <li class="ips-list-item">${this.escapeHtml(item)}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.investor.title}</h4>
                <div class="ips-grid ips-grid--3">
                    <div class="ips-metric">
                        <div class="ips-metric-label">Yatırımcı Tipi</div>
                        <div class="ips-metric-value" style="font-size: 1.1rem;">${this.escapeHtml(c.investor.type)}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">Kişi Türü</div>
                        <div class="ips-metric-value" style="font-size: 1.1rem;">${this.escapeHtml(c.investor.personType)}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">Değerlendirme Tarihi</div>
                        <div class="ips-metric-value" style="font-size: 1.1rem;">${this.escapeHtml(c.investor.assessmentDate)}</div>
                    </div>
                </div>
                <p class="uk-margin-top">${this.escapeHtml(c.investor.description)}</p>
            </div>
        `;

        return this.renderSection('ips-scope', 'Kapsam ve Amaç', 'file-text', content, '1');
    },

    /**
     * Bölüm 2: Yönetişim
     */
    renderGovernanceSection: function (section) {
        if (!section) return '';
        const c = section.content;

        let rolesHtml = '';
        // "parties" veya "roles" dizisini destekle (generator "parties" kullanıyor)
        const partiesData = c.responsibilities?.parties || c.responsibilities?.roles || [];
        if (partiesData.length > 0) {
            rolesHtml = partiesData.map(party => {
                // "duties" dizisi varsa bullet list olarak göster, yoksa "description" kullan
                let responsibilityText = '';
                if (party.duties && Array.isArray(party.duties)) {
                    responsibilityText = '<ul class="ips-list uk-margin-remove">' +
                        party.duties.map(d => `<li class="ips-list-item">${this.escapeHtml(d)}</li>`).join('') +
                        '</ul>';
                } else {
                    responsibilityText = this.escapeHtml(party.description || '');
                }
                return `
                <tr>
                    <td><strong>${this.escapeHtml(party.role)}</strong></td>
                    <td>${responsibilityText}</td>
                </tr>
            `;
            }).join('');
        }

        // "reviewProcess" veya "reviewSchedule" destekle (generator "reviewProcess" kullanıyor)
        const reviewData = c.reviewProcess || c.reviewSchedule || {};
        const reviewTitle = reviewData.title || 'Gözden Geçirme Takvimi';
        const periodicText = reviewData.schedule?.regular || reviewData.periodic || 'Yıllık';
        const triggers = reviewData.triggers || [];

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.responsibilities?.title || 'Sorumluluklar'}</h4>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th style="width: 30%;">Rol</th>
                            <th>Sorumluluk</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rolesHtml}
                    </tbody>
                </table>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${this.escapeHtml(reviewTitle)}</h4>
                <div class="ips-info-panel">
                    <p><strong>Periyodik Gözden Geçirme:</strong> ${this.escapeHtml(periodicText)}</p>
                    <p class="uk-margin-small-top"><strong>Tetikleyici Olaylar:</strong></p>
                    <ul class="ips-list uk-margin-small-top">
                        ${triggers.map(t => `
                            <li class="ips-list-item">${this.escapeHtml(t)}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;

        return this.renderSection('ips-governance', 'Yönetişim', 'users', content, '2');
    },

    /**
     * Bölüm 3: Yatırım Hedefleri
     */
    renderObjectivesSection: function (section) {
        if (!section) return '';
        const c = section.content;

        // Expert AI yatırım hedefleri içeriği
        const aiGoals = this.expertContent?.investment_goals || null;

        // AI içeriği varsa öne çıkar
        const aiGoalsContent = aiGoals ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Birincil Yatırım Hedefi</h4>
                <div class="ips-ai-content" style="padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                        <strong style="font-size: 0.85rem; color: var(--ips-primary);">AI Analizi</strong>
                    </div>
                    <p style="margin: 0; line-height: 1.6; font-size: 1.05rem;">${this.escapeHtml(aiGoals.primary_goal || '')}</p>
                </div>
                ${aiGoals.secondary_goals && aiGoals.secondary_goals.length > 0 ? `
                    <div style="margin-top: 16px;">
                        <strong>İkincil Hedefler:</strong>
                        <ul style="margin-top: 8px; padding-left: 20px;">
                            ${aiGoals.secondary_goals.map(g => `<li>${this.escapeHtml(g)}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>

            ${aiGoals.time_horizon_analysis ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Zaman Ufku Analizi</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiGoals.time_horizon_analysis)}</p>
            </div>
            ` : ''}

            ${aiGoals.return_expectations ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Getiri Beklentileri</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiGoals.return_expectations)}</p>
            </div>
            ` : ''}

            ${aiGoals.risk_budget ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Risk Bütçesi</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiGoals.risk_budget)}</p>
            </div>
            ` : ''}
        ` : '';

        const content = `
            ${aiGoalsContent}

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.returnObjective?.title || 'Getiri Hedefi'}</h4>
                <div class="ips-grid ips-grid--2">
                    <div class="ips-metric">
                        <div class="ips-metric-label">Hedef Yıllık Getiri</div>
                        <div class="ips-metric-value">${c.returnObjective?.target || '-'}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">Getiri Türü</div>
                        <div class="ips-metric-value" style="font-size: 1rem;">${this.escapeHtml(c.returnObjective?.type || 'Nominal')}</div>
                    </div>
                </div>
                <p class="uk-margin-top ips-editable" data-field="objectives.description">
                    ${this.escapeHtml(c.returnObjective?.description || '')}
                </p>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.riskObjective?.title || 'Risk Hedefi'}</h4>
                <div class="ips-info-panel ips-info-panel--secondary">
                    <p><strong>Maksimum Volatilite:</strong> ${c.riskObjective?.maxVolatility || '-'}</p>
                    <p><strong>Maksimum Kayıp Toleransı:</strong> ${c.riskObjective?.maxDrawdown || '-'}</p>
                </div>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.timeHorizon?.title || 'Yatırım Vadesi'}</h4>
                <div class="ips-grid ips-grid--2">
                    <div class="ips-metric">
                        <div class="ips-metric-label">Hedef Vade</div>
                        <div class="ips-metric-value" style="font-size: 1.25rem;">${this.escapeHtml(c.timeHorizon?.horizon || '-')}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">Likidite İhtiyacı</div>
                        <div class="ips-metric-value" style="font-size: 1.25rem;">${this.escapeHtml(c.timeHorizon?.liquidity || '-')}</div>
                    </div>
                </div>
            </div>
        `;

        return this.renderSection('ips-objectives', 'Yatırım Hedefleri', 'crosshairs', content, '3');
    },

    /**
     * Bölüm 4: Risk Profili Analizi
     */
    renderRiskAnalysisSection: function (section) {
        if (!section) return '';
        const c = section.content;
        const profile = c.overallProfile || {};
        const riskCapacity = c.riskCapacity || {};
        const riskWillingness = c.riskWillingness || {};

        // Frontend'den hesaplanan skorları öncelikli kullan
        const capacityScore = riskCapacity.score || profile.score || '-';
        const willingnessScore = riskWillingness.score || profile.score || '-';
        const capacitySummary = riskCapacity.summary || '';
        const willingnessSummary = riskWillingness.summary || '';

        // Risk profil kartları - frontend hesaplaması öncelikli
        const riskComponents = [
            {
                label: 'Risk Kapasitesi',
                value: capacityScore,
                desc: capacitySummary
            },
            {
                label: 'Risk İstekliliği',
                value: willingnessScore,
                desc: willingnessSummary
            }
        ];

        // Profil bilgisi
        const profileScore = profile.score || profile.normalizedScore || '-';
        const profileLevel = profile.classification?.level || 'Risk Profili';
        const profileScoreNum = parseInt(profileScore) || 0;

        // Kapsamlı AI değerlendirmesi oluştur
        const profileNames = { 'low': 'Sağlamcı (Muhafazakar)', 'medium': 'Temkinli (Dengeli)', 'high': 'Agresif (Dinamik)' };
        const profileDisplayName = profileNames[profile.profile] || 'Dengeli';
        const aiAssessmentText = `Risk kapasitesi (${capacityScore}/100) ve risk istekliliğiniz (${willingnessScore}/100) birlikte değerlendirildiğinde, ${profileDisplayName} bir yatırımcı profili ortaya çıkmaktadır. Bu profil, ${profile.profile === 'low' ? 'sermaye koruma odaklı, düşük volatiliteli bir strateji' :
                profile.profile === 'high' ? 'büyüme odaklı, yüksek risk toleranslı bir strateji' :
                    'getiri ve risk arasında denge gözeten bir strateji'
            } gerektirmektedir. Portföy önerileriniz bu profile uygun olarak hazırlanmıştır.`;

        // Tutarsızlık analizi (IPS content'ten)
        const inconsistencyAnalysis = c.inconsistencyAnalysis || {};
        const aiInconsistency = inconsistencyAnalysis.hasInconsistencies ? `
            <div class="ips-alert ips-alert--warning" style="margin-top: 16px;">
                <span uk-icon="icon: warning; ratio: 1.2;"></span>
                <div>
                    <strong>Tutarsızlık Tespit Edildi (${inconsistencyAnalysis.count} adet)</strong>
                    <p style="margin: 4px 0 0 0;">${this.escapeHtml(inconsistencyAnalysis.implications || '')}</p>
                </div>
            </div>
        ` : '';

        // Kapasite faktörleri
        let capacityFactorsHtml = '';
        if (riskCapacity.factors && riskCapacity.factors.length > 0) {
            capacityFactorsHtml = `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">${riskCapacity.title || 'Risk Kapasitesi Faktörleri'}</h4>
                    <table class="ips-table">
                        <thead>
                            <tr>
                                <th style="width: 30%;">Faktör</th>
                                <th>Değerlendirme</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${riskCapacity.factors.map(f => `
                                <tr>
                                    <td><strong>${this.escapeHtml(f.factor)}</strong></td>
                                    <td>${this.escapeHtml(f.assessment)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // İsteklilik faktörleri
        let willingnessFactorsHtml = '';
        if (riskWillingness.factors && riskWillingness.factors.length > 0) {
            willingnessFactorsHtml = `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">${riskWillingness.title || 'Risk İstekliliği Faktörleri'}</h4>
                    <table class="ips-table">
                        <thead>
                            <tr>
                                <th style="width: 30%;">Faktör</th>
                                <th>Yorum</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${riskWillingness.factors.map(f => `
                                <tr>
                                    <td><strong>${this.escapeHtml(f.factor)}</strong></td>
                                    <td>${this.escapeHtml(f.interpretation || f.response || '')}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Genel Risk Profili</h4>
                <div class="ips-risk-gauge">
                    <div class="ips-risk-gauge-value">${profileScore}</div>
                    <div class="ips-risk-gauge-label">${this.escapeHtml(profileLevel)}</div>
                    <div class="ips-risk-bar">
                        <div class="ips-risk-bar-fill" style="width: ${profileScoreNum}%;"></div>
                    </div>
                </div>
                <div class="ips-ai-content" style="margin-top: 16px; padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                        <strong style="font-size: 0.85rem; color: var(--ips-primary);">AI Değerlendirmesi</strong>
                    </div>
                    <p style="margin: 0; line-height: 1.6;">${this.escapeHtml(aiAssessmentText)}</p>
                </div>
                ${aiInconsistency}
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Risk Bileşenleri</h4>
                <div class="ips-grid ips-grid--2">
                    ${riskComponents.map(comp => `
                        <div class="ips-info-panel">
                            <div style="font-weight: 600; margin-bottom: 8px;">${comp.label}</div>
                            <div style="font-size: 1.5rem; color: var(--ips-primary); font-weight: 600;">${this.escapeHtml(String(comp.value))}</div>
                            <div style="font-size: 0.9rem; color: var(--ips-text-muted); margin-top: 8px;">${this.escapeHtml(comp.desc)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${capacityFactorsHtml}
            ${willingnessFactorsHtml}
            ${c.surveyAnalysis ? this.renderSurveyAnalysis(c.surveyAnalysis) : ''}
        `;

        return this.renderSection('ips-risk-analysis', 'Risk Profili Analizi', 'graph', content, '4');
    },

    /**
     * Anket analizi render
     */
    renderSurveyAnalysis: function (surveyAnalysis) {
        if (!surveyAnalysis || !surveyAnalysis.answers) return '';

        const answersHtml = Object.entries(surveyAnalysis.answers).map(([key, answer]) => {
            if (!answer || !answer.label) return '';
            return `
                <tr>
                    <td>${this.escapeHtml(answer.label || key)}</td>
                    <td>${this.escapeHtml(answer.answer || '-')}</td>
                    <td>
                        <span class="ips-badge ips-badge--${this.getScoreBadgeClass(answer.score)}">
                            ${answer.score || '-'}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');

        return `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Anket Cevap Analizi</h4>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Soru</th>
                            <th>Cevap</th>
                            <th>Puan</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${answersHtml}
                    </tbody>
                </table>
            </div>
        `;
    },

    /**
     * Bölüm 5: Kısıtlamalar
     */
    renderConstraintsSection: function (section) {
        if (!section) return '';
        const c = section.content;

        // Expert AI kısıtlar içeriği
        const aiConstraints = this.expertContent?.constraints || null;

        // AI içeriği varsa onu kullan
        let aiConstraintsContent = '';
        if (aiConstraints) {
            aiConstraintsContent = `
                ${aiConstraints.liquidity ? `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: bolt; ratio: 0.9" style="margin-right: 8px;"></span>
                        Likidite Kısıtlamaları
                    </h4>
                    <div class="ips-ai-content" style="padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                            <strong style="font-size: 0.85rem; color: var(--ips-primary);">Likidite İhtiyacı: ${this.escapeHtml(aiConstraints.liquidity.need_level || '')}</strong>
                        </div>
                        <p style="margin: 0 0 12px 0; line-height: 1.6;">${this.escapeHtml(aiConstraints.liquidity.explanation || '')}</p>
                        ${aiConstraints.liquidity.recommendations && aiConstraints.liquidity.recommendations.length > 0 ? `
                            <ul style="margin: 0; padding-left: 20px;">
                                ${aiConstraints.liquidity.recommendations.map(r => `<li>${this.escapeHtml(r)}</li>`).join('')}
                            </ul>
                        ` : ''}
                    </div>
                </div>
                ` : ''}

                ${aiConstraints.time_horizon ? `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: calendar; ratio: 0.9" style="margin-right: 8px;"></span>
                        Zaman Ufku
                    </h4>
                    <div class="ips-info-panel">
                        <p><strong>Kategori:</strong> ${this.escapeHtml(aiConstraints.time_horizon.category || '')}</p>
                        <p style="margin-top: 8px;">${this.escapeHtml(aiConstraints.time_horizon.explanation || '')}</p>
                        ${aiConstraints.time_horizon.implications && aiConstraints.time_horizon.implications.length > 0 ? `
                            <div style="margin-top: 12px;">
                                <strong>Yatırım Etkileri:</strong>
                                <ul style="margin-top: 8px; padding-left: 20px;">
                                    ${aiConstraints.time_horizon.implications.map(i => `<li>${this.escapeHtml(i)}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
                ` : ''}

                ${aiConstraints.tax_considerations ? `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: file-text; ratio: 0.9" style="margin-right: 8px;"></span>
                        Vergi Değerlendirmeleri
                    </h4>
                    <p>${this.escapeHtml(aiConstraints.tax_considerations.summary || '')}</p>
                    ${aiConstraints.tax_considerations.key_points && aiConstraints.tax_considerations.key_points.length > 0 ? `
                        <ul class="ips-list uk-margin-small-top">
                            ${aiConstraints.tax_considerations.key_points.map(p => `<li class="ips-list-item">${this.escapeHtml(p)}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                ` : ''}

                ${aiConstraints.legal_regulatory ? `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: lock; ratio: 0.9" style="margin-right: 8px;"></span>
                        Yasal ve Düzenleyici
                    </h4>
                    <p>${this.escapeHtml(aiConstraints.legal_regulatory.summary || '')}</p>
                    ${aiConstraints.legal_regulatory.key_points && aiConstraints.legal_regulatory.key_points.length > 0 ? `
                        <ul class="ips-list uk-margin-small-top">
                            ${aiConstraints.legal_regulatory.key_points.map(p => `<li class="ips-list-item">${this.escapeHtml(p)}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                ` : ''}

                ${aiConstraints.unique_circumstances && aiConstraints.unique_circumstances.length > 0 ? `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: star; ratio: 0.9" style="margin-right: 8px;"></span>
                        Özel Durumlar
                    </h4>
                    <ul class="ips-list">
                        ${aiConstraints.unique_circumstances.map(uc => `<li class="ips-list-item">${this.escapeHtml(uc)}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            `;
        }

        // Fallback: Mevcut içerik
        const constraintTypes = [
            { key: 'liquidity', title: 'Likidite Kısıtlamaları', icon: 'bolt' },
            { key: 'timeHorizon', title: 'Zaman Ufku', icon: 'calendar' },
            { key: 'tax', title: 'Vergi Değerlendirmeleri', icon: 'file-text' },
            { key: 'legal', title: 'Yasal ve Düzenleyici', icon: 'lock' },
            { key: 'unique', title: 'Özel Durumlar', icon: 'star' }
        ];

        const fallbackContent = !aiConstraints ? constraintTypes.map(ct => {
            const constraint = c[ct.key];
            if (!constraint) return '';

            return `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: ${ct.icon}; ratio: 0.9" style="margin-right: 8px;"></span>
                        ${ct.title}
                    </h4>
                    <p class="ips-editable" data-field="constraints.${ct.key}">${this.escapeHtml(constraint.description || constraint.text || '')}</p>
                    ${constraint.items ? `
                        <ul class="ips-list uk-margin-small-top">
                            ${constraint.items.map(item => `<li class="ips-list-item">${this.escapeHtml(item)}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;
        }).join('') : '';

        const content = aiConstraintsContent || fallbackContent;

        return this.renderSection('ips-constraints', 'Kısıtlamalar', 'lock', content, '5');
    },

    /**
     * Bölüm 6: Varlık Tahsisi
     */
    renderAssetAllocationSection: function (section) {
        if (!section) {
            console.warn('[IPS Renderer] Bölüm 6: section undefined');
            return '';
        }
        const c = section.content;

        // Expert AI strateji içeriği
        const aiStrategy = this.expertContent?.asset_strategy || null;
        const aiEsg = this.expertContent?.esg_policy || null;

        // DEBUG: Gelen veriyi detaylı logla
        console.log('[IPS Renderer] Bölüm 6 - Varlık Tahsisi Verisi:');
        console.log('  strategicAllocation:', JSON.stringify(c?.strategicAllocation, null, 2));
        console.log('  tacticalRanges:', JSON.stringify(c?.tacticalRanges, null, 2));

        // allocation objesi veya ranges dizisi olabilir
        let allocationTable = '';
        const allocation = c?.strategicAllocation?.allocation || c?.strategicAllocation?.ranges;

        console.log('  allocation değeri:', allocation);
        console.log('  allocation tipi:', typeof allocation);
        console.log('  allocation Array mi?:', Array.isArray(allocation));

        if (allocation) {
            // Obje formatı: { 'Para Piyasası': '40-50%', ... }
            if (!Array.isArray(allocation)) {
                allocationTable = Object.entries(allocation).map(([assetClass, range]) => {
                    // "40-50%" formatını parse et
                    const match = range.match(/(\d+)-?(\d+)?%?/);
                    const min = match ? match[1] : '-';
                    const max = match && match[2] ? match[2] : min;
                    const target = match ? Math.round((parseInt(min) + parseInt(max || min)) / 2) : '-';
                    return `
                        <tr>
                            <td><strong>${this.escapeHtml(assetClass)}</strong></td>
                            <td>${min}%</td>
                            <td>${target}%</td>
                            <td>${max}%</td>
                        </tr>
                    `;
                }).join('');
            } else {
                // Dizi formatı: [{ assetClass, min, target, max }, ...]
                allocationTable = allocation.map(range => `
                    <tr>
                        <td><strong>${this.escapeHtml(range.assetClass)}</strong></td>
                        <td>${range.min}%</td>
                        <td>${range.target}%</td>
                        <td>${range.max}%</td>
                    </tr>
                `).join('');
            }
        }

        console.log('  allocationTable HTML:', allocationTable ? allocationTable.substring(0, 200) + '...' : 'BOŞ');

        // Taktik bantlar tablosu
        let tacticalTable = '';
        const tacticalRanges = c?.tacticalRanges?.ranges;
        console.log('  tacticalRanges değeri:', tacticalRanges);

        if (tacticalRanges && typeof tacticalRanges === 'object') {
            tacticalTable = Object.entries(tacticalRanges).map(([asset, range]) => `
                <tr>
                    <td>${this.escapeHtml(asset)}</td>
                    <td>${range.min}%</td>
                    <td><strong>${range.target}%</strong></td>
                    <td>${range.max}%</td>
                </tr>
            `).join('');
        }

        // AI strateji içeriği
        const aiStrategyContent = aiStrategy ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Strateji Özeti</h4>
                <div class="ips-ai-content" style="padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                        <strong style="font-size: 1rem; color: var(--ips-primary);">${this.escapeHtml(aiStrategy.strategy_name || 'Varlık Dağılımı Stratejisi')}</strong>
                    </div>
                    <p style="margin: 0; line-height: 1.6;">${this.escapeHtml(aiStrategy.strategy_rationale || '')}</p>
                </div>
            </div>

            ${aiStrategy.allocations ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Varlık Sınıfı Politikaları</h4>
                <div class="ips-grid ips-grid--2" style="gap: 16px;">
                    ${Object.entries(aiStrategy.allocations).map(([key, val]) => `
                        <div class="ips-info-panel">
                            <strong>${this.escapeHtml(key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))}</strong>
                            <div style="font-size: 1.2rem; color: var(--ips-primary); margin: 8px 0;">${this.escapeHtml(val.range || '')}</div>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--ips-text-muted);">${this.escapeHtml(val.rationale || '')}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            ${aiStrategy.rebalancing_policy ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Yeniden Dengeleme Politikası (AI Önerisi)</h4>
                <p style="line-height: 1.6;">${this.escapeHtml(aiStrategy.rebalancing_policy)}</p>
            </div>
            ` : ''}
        ` : '';

        // AI ESG içeriği
        const aiEsgContent = aiEsg ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">ESG ve Katılım Finans Politikası</h4>
                <div class="ips-info-panel" style="background: ${aiEsg.is_participatory ? '#e8f5e9' : '#fff3e0'}; border-left: 4px solid ${aiEsg.is_participatory ? '#4caf50' : '#ff9800'};">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <span uk-icon="icon: ${aiEsg.is_participatory ? 'check' : 'info'}; ratio: 0.9;"></span>
                        <strong>${aiEsg.is_participatory ? 'Katılım Finans Uyumlu' : 'Standart Yatırım'}</strong>
                    </div>
                    <p style="margin: 0 0 12px 0;">${this.escapeHtml(aiEsg.rationale || '')}</p>
                    ${aiEsg.restrictions && aiEsg.restrictions.length > 0 ? `
                        <div style="margin-top: 12px;">
                            <strong>Kısıtlamalar:</strong>
                            <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                                ${aiEsg.restrictions.map(r => `<li>${this.escapeHtml(r)}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        ` : '';

        const content = `
            ${aiStrategyContent}
            ${aiEsgContent}

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.strategicAllocation?.title || 'Stratejik Varlık Dağılımı'}</h4>
                ${c.strategicAllocation?.description ? `<p class="uk-margin-bottom">${this.escapeHtml(c.strategicAllocation.description)}</p>` : ''}
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Varlık Sınıfı</th>
                            <th>Minimum</th>
                            <th>Hedef</th>
                            <th>Maksimum</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${allocationTable || '<tr><td colspan="4" class="uk-text-center uk-text-muted">Veri bulunamadı</td></tr>'}
                    </tbody>
                </table>
            </div>

            ${tacticalTable ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.tacticalRanges?.title || 'Taktik Bantlar'}</h4>
                <p class="uk-margin-bottom">${this.escapeHtml(c.tacticalRanges?.description || 'Piyasa koşullarına göre izin verilen sapma aralıkları:')}</p>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Varlık Sınıfı</th>
                            <th>Min</th>
                            <th>Hedef</th>
                            <th>Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tacticalTable}
                    </tbody>
                </table>
            </div>
            ` : ''}
            
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.rebalancing?.title || 'Yeniden Dengeleme Politikası'}</h4>
                <div class="ips-info-panel">
                    <p><strong>Yöntem:</strong> ${this.escapeHtml(c.rebalancing?.method || 'Eşik Bazlı')}</p>
                    <p class="uk-margin-small-top"><strong>Tetikleyici:</strong> ${this.escapeHtml(c.rebalancing?.threshold || c.tacticalRanges?.rebalancingTrigger || 'Sapma oranı %5\'i aştığında')}</p>
                    <p class="uk-margin-small-top"><strong>Sıklık:</strong> ${this.escapeHtml(c.rebalancing?.frequency || 'Çeyreklik kontrol')}</p>
                    ${c.rebalancing?.process ? `
                        <div class="uk-margin-top">
                            <strong>Süreç:</strong>
                            <ul class="ips-list uk-margin-small-top">
                                ${c.rebalancing.process.map(step => `<li class="ips-list-item">${this.escapeHtml(step)}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="ips-chart-container uk-margin-top" id="allocationChartContainer">
                <div class="ips-chart-title uk-text-center uk-margin-bottom">Fon Dağılım Önerileri</div>
                <div class="uk-grid-small uk-child-width-1-2@m" uk-grid>
                    <div class="uk-flex uk-flex-center">
                        <canvas id="ipsAllocationChart" width="300" height="300"></canvas>
                    </div>
                    <div class="uk-flex uk-flex-column uk-flex-middle uk-flex-center">
                        <div class="js-fund-index-list" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        `;

        return this.renderSection('ips-allocation', 'Varlık Tahsisi Politikası', 'thumbnails', content, '6');
    },

    /**
     * Bölüm 7: Yatırım Evreni
     */
    renderInvestmentUniverseSection: function (section) {
        if (!section) {
            console.warn('[IPS Renderer] Bölüm 7: section undefined');
            return '';
        }
        const c = section.content;

        // DEBUG: Gelen veriyi logla
        console.log('[IPS Renderer] Bölüm 7 - Yatırım Evreni Verisi:', {
            section: section,
            content: c,
            eligibleProducts: c?.eligibleProducts,
            restrictedProducts: c?.restrictedProducts,
            productCategories: c?.productCategories
        });

        // Uygun ürünler - eligibleProducts veya eligibleInstruments olabilir
        let eligibleHtml = '';
        const eligibleCategories = c?.eligibleProducts?.categories || c?.eligibleInstruments?.list || [];
        const eligibleRiskLevels = c.eligibleProducts?.riskLevels || [];

        if (Array.isArray(eligibleCategories) && eligibleCategories.length > 0) {
            eligibleHtml = eligibleCategories.map(item => `
                <li class="ips-list-item">
                    <span class="ips-badge ips-badge--success" style="margin-right: 8px;">Uygun</span>
                    ${this.escapeHtml(item)}
                </li>
            `).join('');
        }

        // Kısıtlı ürünler - restrictedProducts veya prohibitedInstruments olabilir
        let restrictedHtml = '';
        const restrictedCategories = c.restrictedProducts?.categories || c.prohibitedInstruments?.list || [];
        const restrictionReasons = c.restrictedProducts?.reasons || [];

        if (Array.isArray(restrictedCategories) && restrictedCategories.length > 0) {
            restrictedHtml = restrictedCategories.map(item => `
                <li class="ips-list-item">
                    <span class="ips-badge ips-badge--danger" style="margin-right: 8px;">Kısıtlı</span>
                    ${this.escapeHtml(item)}
                </li>
            `).join('');
        }

        // Fon kategorileri tablosu
        let categoriesTable = '';
        if (c.productCategories?.categories && Array.isArray(c.productCategories.categories)) {
            categoriesTable = c.productCategories.categories.map(cat => `
                <tr>
                    <td><strong>${this.escapeHtml(cat.name)}</strong></td>
                    <td>${this.escapeHtml(cat.riskLevel)}</td>
                    <td>
                        <span class="ips-badge ${cat.suitability?.includes('Yüksek') ? 'ips-badge--success' : cat.suitability?.includes('Düşük') ? 'ips-badge--danger' : 'ips-badge--warning'}">
                            ${this.escapeHtml(cat.suitability)}
                        </span>
                    </td>
                    <td class="uk-text-small">${this.escapeHtml(cat.description)}</td>
                </tr>
            `).join('');
        }

        // Seçim kriterleri
        let criteriaHtml = '';
        if (c.selectionCriteria?.criteria && Array.isArray(c.selectionCriteria.criteria)) {
            criteriaHtml = c.selectionCriteria.criteria.map(crit => `
                <li class="ips-list-item">${this.escapeHtml(crit)}</li>
            `).join('');
        }

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.eligibleProducts?.title || 'Uygun Yatırım Ürünleri'}</h4>
                ${c.eligibleProducts?.description ? `<p class="uk-margin-bottom">${this.escapeHtml(c.eligibleProducts.description)}</p>` : ''}
                ${eligibleRiskLevels.length > 0 ? `<p class="uk-text-small uk-text-muted uk-margin-bottom">Uygun Risk Seviyeleri: ${eligibleRiskLevels.join(', ')}/7</p>` : ''}
                <ul class="ips-list">
                    ${eligibleHtml || '<li class="ips-list-item uk-text-muted">Tüm Kuveyt Türk Portföy katılım fonları</li>'}
                </ul>
            </div>
            
            ${restrictedHtml ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.restrictedProducts?.title || 'Kısıtlı/Uygun Olmayan Ürünler'}</h4>
                ${c.restrictedProducts?.warning ? `<p class="uk-text-warning uk-margin-bottom">${this.escapeHtml(c.restrictedProducts.warning)}</p>` : ''}
                <div class="ips-info-panel ips-info-panel--danger">
                    <ul class="ips-list">
                        ${restrictedHtml}
                    </ul>
                    ${restrictionReasons.length > 0 ? `
                        <p class="uk-margin-top uk-text-small"><strong>Kısıtlama Nedenleri:</strong> ${restrictionReasons.join(', ')}</p>
                    ` : ''}
                </div>
            </div>
            ` : ''}
            
            ${categoriesTable ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.productCategories?.title || 'Fon Kategorileri'}</h4>
                <div class="uk-overflow-auto">
                    <table class="ips-table">
                        <thead>
                            <tr>
                                <th>Kategori</th>
                                <th>Risk Seviyesi</th>
                                <th>Uygunluk</th>
                                <th>Açıklama</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${categoriesTable}
                        </tbody>
                    </table>
                </div>
            </div>
            ` : ''}
            
            ${criteriaHtml ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.selectionCriteria?.title || 'Fon Seçim Kriterleri'}</h4>
                <ul class="ips-list">
                    ${criteriaHtml}
                </ul>
            </div>
            ` : ''}

            ${c.riskyInterests ? this.renderRiskyInterests(c.riskyInterests) : ''}
        `;

        return this.renderSection('ips-universe', 'Yatırım Evreni', 'grid', content, '7');
    },

    /**
     * Q14: Riskli Yatırım İlgi Alanları render
     */
    renderRiskyInterests: function (data) {
        if (!data) return '';

        let itemsHtml = '';
        if (data.hasInterest && data.items && data.items.length > 0) {
            itemsHtml = `
                <table class="ips-table uk-margin-top">
                    <thead>
                        <tr>
                            <th>Yatırım Aracı</th>
                            <th>Risk Düzeyi</th>
                            <th>Not</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.items.map(item => `
                            <tr>
                                <td><strong>${this.escapeHtml(item.name)}</strong></td>
                                <td>
                                    <span class="ips-badge ${item.risk === 'Çok Yüksek' ? 'ips-badge--danger' : item.risk === 'Yüksek' ? 'ips-badge--warning' : 'ips-badge--secondary'}">
                                        ${this.escapeHtml(item.risk)}
                                    </span>
                                </td>
                                <td class="uk-text-small">${this.escapeHtml(item.note)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }

        return `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${this.escapeHtml(data.title || 'Riskli Yatırım İlgi Alanları')}</h4>
                <p>${this.escapeHtml(data.description)}</p>
                ${itemsHtml}
                ${data.recommendation ? `
                    <div class="ips-info-panel ${data.hasInterest ? 'ips-info-panel--warning' : ''}" style="margin-top: 12px;">
                        <strong>Öneri:</strong> ${this.escapeHtml(data.recommendation)}
                    </div>
                ` : ''}
            </div>
        `;
    },

    /**
     * Bölüm 8: Risk Yönetimi
     */
    renderRiskManagementSection: function (section) {
        if (!section) {
            console.warn('[IPS Renderer] Bölüm 8: section undefined');
            return '';
        }
        const c = section.content;

        // DEBUG: Gelen veriyi logla
        console.log('[IPS Renderer] Bölüm 8 - Risk Yönetimi Verisi:', {
            section: section,
            content: c,
            riskMeasures: c?.riskMeasures,
            riskLimits: c?.riskLimits
        });

        // Risk ölçütleri - riskMeasures.metrics dizisi veya varsayılan değerler
        const defaultMetrics = [
            { name: 'Volatilite (Standart Sapma)', target: '< %15', description: 'Yıllık portföy volatilitesi hedefi' },
            { name: 'Sharpe Oranı', target: '> 0.5', description: 'Risk-getiri oranı minimum değeri' },
            { name: 'Maksimum Düşüş', target: '< %10', description: 'İzin verilen maksimum değer kaybı' },
            { name: 'Tracking Error', target: '< %5', description: 'Benchmark sapma toleransı' },
            { name: 'Beta', target: '0.8 - 1.2', description: 'Piyasa hassasiyeti aralığı' }
        ];

        const metricsToRender = (c?.riskMeasures?.metrics && Array.isArray(c.riskMeasures.metrics) && c.riskMeasures.metrics.length > 0)
            ? c.riskMeasures.metrics
            : defaultMetrics;

        const metricsHtml = metricsToRender.map(metric => `
            <tr>
                <td><strong>${this.escapeHtml(metric.name)}</strong></td>
                <td><span class="ips-badge ips-badge--primary">${this.escapeHtml(metric.target || '-')}</span></td>
                <td class="uk-text-small">${this.escapeHtml(metric.description || '')}</td>
            </tr>
        `).join('');

        // Risk limitleri - riskLimits veya limits objesi veya varsayılan değerler
        const defaultLimits = [
            { type: 'Tek Fon Konsantrasyonu', limit: 'Maks. %30', rationale: 'Çeşitlendirme için tek fona aşırı yoğunlaşma önlenir' },
            { type: 'Sektör Konsantrasyonu', limit: 'Maks. %40', rationale: 'Sektörel risk çeşitlendirmesi sağlanır' },
            { type: 'Likidite Riski', limit: 'Min. %20 likit', rationale: 'Acil nakit ihtiyaçları için yeterli likidite' },
            { type: 'Kur Riski', limit: 'Maks. %25 döviz', rationale: 'Döviz dalgalanmalarına karşı koruma' },
            { type: 'Vade Riski', limit: 'Ortalama vade < 3 yıl', rationale: 'Faiz oranı hassasiyetini sınırlar' }
        ];

        let limitsHtml = '';
        const limits = c.riskLimits?.limits || c.limits;
        let limitsToRender = [];

        if (limits) {
            if (Array.isArray(limits) && limits.length > 0) {
                limitsToRender = limits;
            } else if (typeof limits === 'object' && Object.keys(limits).length > 0) {
                limitsToRender = Object.entries(limits).map(([key, limit]) => ({
                    type: limit.label || limit.type || key,
                    limit: limit.value || limit.limit || '-',
                    rationale: limit.description || limit.rationale || ''
                }));
            }
        }

        if (limitsToRender.length === 0) {
            limitsToRender = defaultLimits;
        }

        limitsHtml = limitsToRender.map(limit => `
            <tr>
                <td><strong>${this.escapeHtml(limit.type || limit.label || '-')}</strong></td>
                <td><span class="ips-badge ips-badge--secondary">${this.escapeHtml(limit.limit || limit.value || '-')}</span></td>
                <td class="uk-text-small">${this.escapeHtml(limit.rationale || limit.description || '')}</td>
            </tr>
        `).join('');

        // Monitoring/izleme bilgileri
        let monitoringHtml = '';
        if (c.monitoring?.activities && Array.isArray(c.monitoring.activities)) {
            monitoringHtml = c.monitoring.activities.map(act => `
                <li class="ips-list-item">${this.escapeHtml(act)}</li>
            `).join('');
        }

        // Stress test bilgileri
        let stressTestHtml = '';
        if (c.stressTesting?.scenarios && Array.isArray(c.stressTesting.scenarios)) {
            stressTestHtml = c.stressTesting.scenarios.map(scenario => `
                <tr>
                    <td>${this.escapeHtml(scenario.name)}</td>
                    <td>${this.escapeHtml(scenario.impact || '-')}</td>
                    <td class="uk-text-small">${this.escapeHtml(scenario.action || '')}</td>
                </tr>
            `).join('');
        }

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.riskMeasures?.title || 'Risk Ölçütleri'}</h4>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Ölçüt</th>
                            <th>Hedef</th>
                            <th>Açıklama</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${metricsHtml}
                    </tbody>
                </table>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.riskLimits?.title || 'Risk Limitleri'}</h4>
                ${c.riskLimits?.description ? `<p class="uk-margin-bottom">${this.escapeHtml(c.riskLimits.description)}</p>` : ''}
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Limit Türü</th>
                            <th>Değer</th>
                            <th>Gerekçe</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${limitsHtml}
                    </tbody>
                </table>
            </div>
            
            ${monitoringHtml ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.monitoring?.title || 'Risk İzleme'}</h4>
                <ul class="ips-list">
                    ${monitoringHtml}
                </ul>
            </div>
            ` : ''}
            
            ${stressTestHtml ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.stressTesting?.title || 'Stres Testi Senaryoları'}</h4>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Senaryo</th>
                            <th>Beklenen Etki</th>
                            <th>Eylem Planı</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${stressTestHtml}
                    </tbody>
                </table>
            </div>
            ` : ''}
        `;

        return this.renderSection('ips-risk-management', 'Risk Yönetimi', 'warning', content, '8');
    },

    /**
     * Bölüm 9: Katılım Finans
     */
    renderParticipationFinanceSection: function (section) {
        if (!section) return '';
        const c = section.content;

        let principlesHtml = '';
        if (c.principles?.items) {
            principlesHtml = c.principles.items.map(p => `
                <div class="ips-info-panel uk-margin-small-bottom">
                    <strong>${this.escapeHtml(p.title)}</strong>
                    <p class="uk-margin-small-top">${this.escapeHtml(p.description)}</p>
                </div>
            `).join('');
        }

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.principles?.title || 'Temel İlkeler'}</h4>
                ${principlesHtml}
            </div>
            
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.screening?.title || 'Fon Tarama Kriterleri'}</h4>
                <div class="ips-info-panel ips-info-panel--secondary">
                    <ul class="ips-list">
                        ${(c.screening?.criteria || []).map(crit => `
                            <li class="ips-list-item">${this.escapeHtml(crit)}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;

        return this.renderSection('ips-participation', 'Katılım Finans İlkeleri', 'heart', content, '9');
    },

    /**
     * Bölüm 10: Davranışsal Bulgular
     */
    renderBehavioralSection: function (section) {
        if (!section) return '';
        const c = section.content;

        // Expert AI yatırımcı profili ve risk analizi içeriklerini al
        const aiProfile = this.expertContent?.investor_profile || null;
        const aiRisk = this.expertContent?.risk_analysis || null;

        // AI güçlü yönler ve dikkat noktaları
        let aiStrengthsHtml = '';
        if (aiProfile?.strengths && aiProfile.strengths.length > 0) {
            aiStrengthsHtml = `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: check; ratio: 0.9" style="margin-right: 8px; color: #4caf50;"></span>
                        Güçlü Yönler
                    </h4>
                    <div class="ips-ai-content" style="padding: 16px; background: #e8f5e9; border-radius: 8px; border-left: 4px solid #4caf50;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                            <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                            <strong style="font-size: 0.85rem; color: #2e7d32;">AI Analizi</strong>
                        </div>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${aiProfile.strengths.map(s => `<li style="margin-bottom: 8px;">${this.escapeHtml(s)}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }

        let aiAttentionHtml = '';
        if (aiProfile?.attention_points && aiProfile.attention_points.length > 0) {
            aiAttentionHtml = `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: warning; ratio: 0.9" style="margin-right: 8px; color: #ff9800;"></span>
                        Dikkat Edilmesi Gerekenler
                    </h4>
                    <div class="ips-ai-content" style="padding: 16px; background: #fff3e0; border-radius: 8px; border-left: 4px solid #ff9800;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                            <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                            <strong style="font-size: 0.85rem; color: #e65100;">AI Analizi</strong>
                        </div>
                        <ul style="margin: 0; padding-left: 20px;">
                            ${aiProfile.attention_points.map(a => `<li style="margin-bottom: 8px;">${this.escapeHtml(a)}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }

        // AI tutarsızlık analizi
        let aiInconsistencyHtml = '';
        if (aiRisk?.inconsistency_found && aiRisk?.inconsistency_explanation) {
            aiInconsistencyHtml = `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: warning; ratio: 0.9" style="margin-right: 8px; color: var(--ips-accent);"></span>
                        Davranışsal Tutarsızlık Analizi
                    </h4>
                    <div class="ips-alert ips-alert--warning" style="margin-top: 8px;">
                        <span uk-icon="icon: info; ratio: 1.2;"></span>
                        <div>
                            <strong>Tutarsızlık Tespit Edildi</strong>
                            <p style="margin: 4px 0 0 0;">${this.escapeHtml(aiRisk.inconsistency_explanation)}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        let biasesHtml = '';
        if (c.identifiedBiases?.items) {
            biasesHtml = c.identifiedBiases.items.map(bias => `
                <div class="ips-info-panel ips-info-panel--warning uk-margin-small-bottom">
                    <strong>${this.escapeHtml(bias.name)}</strong>
                    <p class="uk-margin-small-top">${this.escapeHtml(bias.description)}</p>
                    <p class="uk-margin-small-top"><strong>Öneri:</strong> ${this.escapeHtml(bias.mitigation || '')}</p>
                </div>
            `).join('');
        }

        let inconsistenciesHtml = '';
        if (c.inconsistencies?.items && c.inconsistencies.items.length > 0) {
            inconsistenciesHtml = `
                <div class="ips-subsection">
                    <h4 class="ips-subsection-title">
                        <span uk-icon="icon: warning; ratio: 0.9" style="margin-right: 8px; color: var(--ips-accent);"></span>
                        Tespit Edilen Tutarsızlıklar
                    </h4>
                    ${c.inconsistencies.items.map(inc => `
                        <div class="ips-info-panel ips-info-panel--warning uk-margin-small-bottom">
                            <p>${this.escapeHtml(inc.description)}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        const content = `
            ${aiStrengthsHtml}
            ${aiAttentionHtml}
            ${aiInconsistencyHtml}

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.identifiedBiases?.title || 'Tespit Edilen Eğilimler'}</h4>
                ${biasesHtml || '<p>Belirgin bir davranışsal eğilim tespit edilmemiştir.</p>'}
            </div>
            ${inconsistenciesHtml}
        `;

        return this.renderSection('ips-behavioral', 'Davranışsal Finans Bulguları', 'user', content, '10');
    },

    /**
     * Bölüm 11: İzleme ve Raporlama
     */
    renderMonitoringSection: function (section) {
        if (!section) return '';
        const c = section.content;

        // Expert AI izleme içeriği
        const aiMonitoring = this.expertContent?.monitoring || null;

        // KPI tablosu: Önce content'ten, yoksa varsayılan değerler
        let kpiHtml = '';
        const kpiItems = c.kpis?.items || [];

        // Varsayılan KPI'lar - eğer content'te yoksa bunları kullan
        const defaultKPIs = [
            { metric: 'Portföy Getirisi', target: 'Benchmark + %1', frequency: 'Aylık' },
            { metric: 'Volatilite (Standart Sapma)', target: '< %15', frequency: 'Aylık' },
            { metric: 'Sharpe Oranı', target: '> 0.5', frequency: 'Çeyreklik' },
            { metric: 'Maksimum Düşüş (Drawdown)', target: '< %10', frequency: 'Aylık' },
            { metric: 'Katılım Uyumluluğu', target: '%100', frequency: 'Sürekli' },
            { metric: 'Varlık Dağılımı Sapması', target: '< %5', frequency: 'Haftalık' }
        ];

        const kpisToRender = kpiItems.length > 0 ? kpiItems : defaultKPIs;
        kpiHtml = kpisToRender.map(kpi => `
            <tr>
                <td><strong>${this.escapeHtml(kpi.metric)}</strong></td>
                <td>${this.escapeHtml(kpi.target || '-')}</td>
                <td>${this.escapeHtml(kpi.frequency || '-')}</td>
            </tr>
        `).join('');

        // AI içeriği varsa onu kullan
        const aiMonitoringContent = aiMonitoring ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Gözden Geçirme Planı</h4>
                <div class="ips-ai-content" style="padding: 16px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 8px; border-left: 4px solid var(--ips-primary);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: bolt; ratio: 0.9;"></span>
                        <strong style="font-size: 0.85rem; color: var(--ips-primary);">AI Önerisi</strong>
                    </div>
                    <div class="ips-grid ips-grid--2" style="gap: 16px;">
                        <div>
                            <strong>Gözden Geçirme Sıklığı:</strong>
                            <p style="margin: 4px 0 0 0; font-size: 1.1rem; color: var(--ips-primary);">${this.escapeHtml(aiMonitoring.review_frequency || '')}</p>
                        </div>
                        <div>
                            <strong>Yeniden Dengeleme Kriteri:</strong>
                            <p style="margin: 4px 0 0 0;">${this.escapeHtml(aiMonitoring.rebalancing_criteria || '')}</p>
                        </div>
                    </div>
                </div>
            </div>

            ${aiMonitoring.review_triggers && aiMonitoring.review_triggers.length > 0 ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Gözden Geçirme Tetikleyicileri</h4>
                <ul class="ips-list">
                    ${aiMonitoring.review_triggers.map(t => `<li class="ips-list-item">${this.escapeHtml(t)}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            ${aiMonitoring.performance_benchmarks && aiMonitoring.performance_benchmarks.length > 0 ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">Performans Karşılaştırma Ölçütleri</h4>
                <ul class="ips-list">
                    ${aiMonitoring.performance_benchmarks.map(b => `<li class="ips-list-item">${this.escapeHtml(b)}</li>`).join('')}
                </ul>
            </div>
            ` : ''}

            ${aiMonitoring.communication_plan ? `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">İletişim Planı</h4>
                <p>${this.escapeHtml(aiMonitoring.communication_plan)}</p>
            </div>
            ` : ''}
        ` : '';

        const content = `
            ${aiMonitoringContent}

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.reportingSchedule?.title || 'Raporlama Takvimi'}</h4>
                <div class="ips-grid ips-grid--3">
                    <div class="ips-metric">
                        <div class="ips-metric-label">Performans Raporu</div>
                        <div class="ips-metric-value" style="font-size: 1rem;">${this.escapeHtml(c.reportingSchedule?.performance || 'Aylık')}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">Kapsamlı Değerlendirme</div>
                        <div class="ips-metric-value" style="font-size: 1rem;">${this.escapeHtml(c.reportingSchedule?.comprehensive || 'Çeyreklik')}</div>
                    </div>
                    <div class="ips-metric">
                        <div class="ips-metric-label">IPS Gözden Geçirme</div>
                        <div class="ips-metric-value" style="font-size: 1rem;">${this.escapeHtml(c.reportingSchedule?.ipsReview || 'Yıllık')}</div>
                    </div>
                </div>
            </div>

            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.kpis?.title || 'Temel Performans Göstergeleri'}</h4>
                <table class="ips-table">
                    <thead>
                        <tr>
                            <th>Gösterge</th>
                            <th>Hedef</th>
                            <th>İzleme Sıklığı</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${kpiHtml}
                    </tbody>
                </table>
            </div>
        `;

        return this.renderSection('ips-monitoring', 'İzleme ve Raporlama', 'clipboard', content, '11');
    },

    /**
     * Bölüm 12: Onay
     */
    renderApprovalSection: function (section) {
        if (!section) return '';
        const c = section.content;

        const content = `
            <div class="ips-subsection">
                <h4 class="ips-subsection-title">${c.declaration?.title || 'Beyan'}</h4>
                <div class="ips-info-panel">
                    <p>${this.escapeHtml(c.declaration?.text || 'Bu Yatırım Politikası Beyanı\'nı okudum, anladım ve kabul ediyorum.')}</p>
                </div>
            </div>
            
            <div class="ips-signature-area">
                <div class="ips-signature-box" id="investorSignatureBox">
                    <div class="ips-signature-placeholder" id="investorSignaturePlaceholder" style="min-height: 120px; display: flex; align-items: flex-end; justify-content: center; position: relative;">
                         <!-- İmza resmi buraya gelecek -->
                         <div id="investorSignatureContainer" style="display: none; width: 100%; height: 100%;">
                            <img id="investorSignatureImage" src="" alt="İmza" style="max-height: 80px; max-width: 100%;">
                            <button class="ips-btn ips-btn--icon ips-btn--xs no-print" onclick="IPSReportRenderer.removeSignature()" style="position: absolute; top: 0; right: 0; background: #fff; border: 1px solid #ccc;">
                                <span uk-icon="icon: trash; ratio: 0.7"></span>
                            </button>
                         </div>
                         <!-- İmza Çizgisi -->
                         <div class="ips-signature-line" id="investorSignatureLine"></div>
                         
                         <!-- İmza Ekle Butonu -->
                         <button class="ips-btn ips-btn--outline ips-btn--sm no-print" id="addSignatureBtn" onclick="IPSReportRenderer.openSignatureModal()" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                            <span uk-icon="icon: pencil; ratio: 0.8"></span>
                            İmza Ekle
                         </button>
                    </div>
                    
                    <div class="ips-signature-label">Yatırımcı İmzası</div>
                    <div class="ips-editable ips-input uk-margin-small-top" 
                         data-field="approval.investorName" 
                         style="text-align: center;">
                        İsim Soyisim
                    </div>
                    <div style="margin-top: 8px; color: var(--ips-text-muted);">
                        Tarih: ${this.formatDate(new Date())}
                    </div>
                </div>
                
                <div class="ips-signature-box">
                    <div class="ips-signature-placeholder" style="min-height: 120px; display: flex; align-items: flex-end; justify-content: center;">
                        <div class="ips-signature-line"></div>
                    </div>
                    <div class="ips-signature-label">Kuveyt Türk Portföy Yetkilisi</div>
                    <div style="margin-top: 12px; color: var(--ips-text-muted);">
                        Kuveyt Türk Portföy Yönetimi A.Ş.
                    </div>
                </div>
            </div>

            <!-- Signature Modal -->
            <div id="signatureModal" class="uk-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; background: rgba(0,0,0,0.5);">
                <div class="uk-modal-dialog uk-modal-body" style="background: white; width: 500px; max-width: 90%; margin: 50px auto; padding: 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                    <h2 class="uk-modal-title" style="font-size: 1.25rem; font-weight: 600; margin-bottom: 16px;">İmza Ekle</h2>
                    
                    <div style="margin-bottom: 16px;">
                        <ul uk-tab style="display: flex; gap: 16px; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 16px;">
                            <li class="uk-active"><a href="#" onclick="IPSReportRenderer.switchSignatureTab('draw')">Çiz</a></li>
                            <li><a href="#" onclick="IPSReportRenderer.switchSignatureTab('upload')">Yükle</a></li>
                        </ul>

                        <!-- Draw Tab -->
                        <div id="tab-draw" style="display: block;">
                            <div style="border: 1px dashed #ccc; background: #f8f9fa; border-radius: 4px;">
                                <canvas id="signaturePad" width="450" height="200" style="width: 100%; height: 200px; touch-action: none;"></canvas>
                            </div>
                            <div style="text-align: right; margin-top: 8px;">
                                <button class="ips-btn ips-btn--xs ips-btn--outline" onclick="IPSReportRenderer.clearSignaturePad()">Temizle</button>
                            </div>
                        </div>

                        <!-- Upload Tab -->
                        <div id="tab-upload" style="display: none;">
                            <div class="js-upload uk-placeholder uk-text-center" style="border: 1px dashed #ccc; padding: 32px; background: #f8f9fa; border-radius: 4px;">
                                <span uk-icon="icon: cloud-upload"></span>
                                <span class="uk-text-middle">Bir imza görseli sürükleyin veya</span>
                                <div uk-form-custom>
                                    <input type="file" id="signatureFileInput" accept="image/*" onchange="IPSReportRenderer.handleSignatureUpload(this)">
                                    <span class="uk-link">seçin</span>
                                </div>
                            </div>
                            <div id="uploadPreview" style="display: none; margin-top: 16px; text-align: center;">
                                <img id="uploadPreviewImg" src="" style="max-height: 150px; border: 1px solid #eee;">
                            </div>
                        </div>
                    </div>

                    <div class="uk-text-right" style="margin-top: 24px;">
                        <button class="ips-btn ips-btn--outline uk-modal-close" onclick="IPSReportRenderer.closeSignatureModal()">İptal</button>
                        <button class="ips-btn ips-btn--primary" onclick="IPSReportRenderer.saveSignature()">Kaydet</button>
                    </div>
                </div>
            </div>
            
            <div class="uk-margin-large-top uk-text-center no-print">
                <p style="font-size: 0.85rem; color: var(--ips-text-muted);">
                    Bu belge elektronik ortamda oluşturulmuştur.
                    <br>Belge Referans No: IPS-${Date.now().toString(36).toUpperCase()}
                </p>
            </div>
        `;

        return this.renderSection('ips-approval', 'Gözden Geçirme ve Onay', 'check', content, '12');
    },

    // ========== UTILITY FUNCTIONS ==========

    /**
     * Profil bazlı tutarlı expert content oluştur
     * Backend'den gelen tutarsız verileri override eder
     */
    generateConsistentExpertContent: function (profileType, profileScore, ipsData) {
        const profiles = {
            low: {
                name: 'Sağlamcı (Muhafazakar)',
                summary: 'Anket sonuçlarınıza göre sağlamcı (muhafazakar) bir yatırımcı profili sergiliyorsunuz. Düşük risk toleransınız ve sermaye koruma önceliğiniz doğrultusunda, anapara güvenliği ve istikrarlı gelir sağlayan bir strateji sizin için en uygun seçenektir.',
                demographics: 'Demografik verileriniz ve finansal durumunuz analiz edildiğinde, likidite ihtiyaçlarınızı karşılayacak ve sermaye korumasını ön planda tutacak bir portföy yapısı önerilmektedir. Mevcut varlık durumunuz göz önüne alındığında, düşük volatiliteli ve sabit getirili araçlar ağırlıklı bir dağılım uygundur.',
                personality: 'Yatırım kararlarınızda temkinli ve güvenlik odaklı bir yaklaşım sergiliyorsunuz. Piyasa dalgalanmalarından kaçınma eğilimindesiniz ve anapara güvenliğini ön planda tutuyorsunuz.',
                strengths: [
                    'Sermaye koruma konusunda disiplinli bir tutumunuz var',
                    'Finansal hedefler konusunda net bir vizyona sahipsiniz',
                    'Düzenli gelir beklentileriniz tutarlı',
                    'Risk yönetimi konusunda bilinçli bir yaklaşımınız var'
                ],
                attention: [
                    'Aşırı muhafazakar yaklaşım enflasyon karşısında reel kayba yol açabilir',
                    'Uzun vadede büyüme fırsatlarını kaçırma riski değerlendirilmeli',
                    'Portföyde minimum düzeyde büyüme odaklı varlık bulundurulmalı',
                    'Enflasyon üstü reel getiri hedeflenmelidir'
                ],
                goalSummary: 'Birincil yatırım hedefiniz, sermaye koruması ve enflasyonun üzerinde istikrarlı getiri sağlamaktır. Düşük volatilite ve düzenli gelir akışı öncelikli hedeflerinizdir.',
                goals: ['Anapara koruması ve sermaye güvenliği', 'Enflasyonun üzerinde düzenli gelir elde etmek', 'Düşük volatiliteli bir portföy yapısı sürdürmek'],
                timeHorizon: 'Kısa-orta vadeli (1-3 yıl) bir yatırım ufku önerilmektedir. Sermaye koruma odaklı profiliniz gereği, uzun vadeli volatiliteye maruz kalmamak için daha kısa vadeli enstrümanlar tercih edilmelidir. Para piyasası fonları ve kısa vadeli kira sertifikaları ideal araçlardır.',
                returnExpectations: 'Hedef getiri: Enflasyon + %1-3 reel getiri. Muhafazakar profiliniz için öncelik sermaye koruması olup, düzenli kupon/kar payı geliri beklentisi ön plandadır. Yıllık bazda TÜFE üzerinde pozitif reel getiri hedeflenmelidir.',
                riskBudget: 'Maksimum portföy düşüşü (drawdown) toleransı: %5-8. Yıllık volatilite hedefi: %5-10 aralığında. Portföyün %80-90\'ı düşük riskli araçlarda (para piyasası, kira sertifikası) tutulmalıdır.',
                liquidityNeedLevel: 'Yüksek',
                liquidityExplanation: 'Muhafazakar profiliniz gereği, portföyün büyük çoğunluğu yüksek likiditeye sahip olmalıdır. Ani nakit ihtiyaçlarını karşılayabilecek esneklik korunmalıdır.',
                liquidityRecommendations: [
                    'Portföyün en az %30-50\'si T+0 veya T+1 likiditeye sahip fonlarda tutulmalı',
                    'Acil durum fonu olarak 6 aylık gider tutarı ayrılmalı',
                    'Uzun vadeli kilitlenen yatırımlar toplam portföyün %10\'unu geçmemeli'
                ],
                timeHorizonCategory: 'Kısa Vade (1-3 Yıl)',
                timeHorizonExplanation: 'Sermaye koruma önceliğiniz ve düşük risk toleransınız göz önüne alındığında, kısa vadeli yatırım araçları ağırlıklı bir strateji uygulanmalıdır.',
                timeHorizonImplications: [
                    'Para piyasası fonları ve kısa vadeli kira sertifikaları ağırlıklı olmalı',
                    'Uzun vadeli hisse senedi fonları sınırlı tutulmalı (%5-10)',
                    'Vade uyumsuzluğu riskinden kaçınılmalı'
                ],
                strategyName: 'Sermaye Koruma Stratejisi',
                strategyRationale: 'Düşük risk toleransınız ve sermaye güvenliği önceliğiniz doğrultusunda, para piyasası ve sabit getirili araçlar ağırlıklı bir varlık dağılımı uygulanmaktadır. Portföy, düşük volatilite ve düzenli gelir akışı sağlayacak şekilde yapılandırılmıştır.',
                allocations: {
                    'Para Piyasası': { range: '%40-55', rationale: 'Yüksek likidite ve sermaye koruması sağlar' },
                    'Kira Sertifikası': { range: '%25-35', rationale: 'Düzenli kupon geliri ve düşük volatilite sunar' },
                    'Altın/Kıymetli Madenler': { range: '%10-15', rationale: 'Enflasyon koruması ve portföy çeşitlendirmesi' },
                    'Hisse/Katılım Endeksi': { range: '%5-10', rationale: 'Minimum düzeyde büyüme potansiyeli' }
                },
                rebalancingPolicy: 'Portföy hedef dağılımından %3-5 sapma durumunda yeniden dengeleme yapılmalıdır. Çeyreklik periyodik kontroller önerilir.',
                reviewFrequency: 'Aylık',
                rebalancingCriteria: 'Hedef dağılımdan %3-5 sapma veya piyasa koşullarında önemli değişiklik',
                reviewTriggers: [
                    'Portföy volatilitesi hedef bandın üzerine çıktığında',
                    'Faiz oranlarında önemli değişiklik olduğunda',
                    'Yatırımcının finansal durumunda değişiklik olduğunda',
                    'Piyasalarda %10\'dan fazla düşüş yaşandığında'
                ],
                performanceBenchmarks: [
                    'BIST-KYD Repo Endeksi (para piyasası kıyaslama)',
                    'BIST-KYD TLREF Endeksi',
                    'TÜFE + %2 (reel getiri hedefi)'
                ],
                communicationPlan: 'Aylık performans raporu, çeyreklik strateji değerlendirmesi ve yıllık kapsamlı IPS gözden geçirmesi yapılacaktır.'
            },
            medium: {
                name: 'Dengeli (Temkinli)',
                summary: 'Anket sonuçlarınıza göre dengeli bir yatırımcı profili sergiliyorsunuz. Orta risk toleransınız ve finansal hedefleriniz doğrultusunda, sermaye koruma ile büyüme arasında denge kuran bir strateji sizin için en uygun seçenektir.',
                demographics: 'Demografik verileriniz ve finansal durumunuz analiz edildiğinde, likidite ihtiyaçlarınızı karşılayacak ancak uzun vadeli sermaye birikimini de destekleyecek bir portföy yapısı önerilmektedir. Düzenli gelir akışınız ve mevcut varlık durumunuz risk alma kapasitenizi desteklemektedir.',
                personality: 'Yatırım kararlarınızda dengeli ve pragmatik bir yaklaşım sergiliyorsunuz. Piyasa dalgalanmalarına karşı bekleme ve gözlemleme eğilimindesiniz.',
                strengths: [
                    'Risk-getiri dengesini iyi kurabiliyorsunuz',
                    'Finansal hedefler konusunda net bir vizyona sahipsiniz',
                    'Uzun vadeli düşünme kapasitesine sahipsiniz',
                    'Yatırım araçları hakkında temel bilgiye sahipsiniz'
                ],
                attention: [
                    'Enflasyon riski ve reel getiri takibi önemlidir',
                    'Likidite yönetimi ve acil durum fonu ayrımı yapılmalıdır',
                    'Duygusal kararlardan kaçınmak için IPS\'e sadık kalınmalıdır',
                    'Periyodik portföy değerlendirmesi ihmal edilmemelidir'
                ],
                goalSummary: 'Birincil yatırım hedefiniz, risk ve getiri arasında denge kurarak uzun vadede varlık artışı sağlamaktır.',
                goals: ['Uzun vadeli sermaye büyümesi', 'Enflasyonun üzerinde reel getiri sağlamak', 'Portföy çeşitlendirmesi ile riskleri minimize etmek'],
                timeHorizon: 'Orta vadeli (3-5 yıl) bir yatırım ufku önerilmektedir. Dengeli profiliniz, hem kısa vadeli likidite hem de uzun vadeli büyüme ihtiyaçlarını karşılayacak bir vade yapısına uygundur. Karma fonlar ve orta vadeli kira sertifikaları ideal araçlardır.',
                returnExpectations: 'Hedef getiri: Enflasyon + %3-5 reel getiri. Dengeli profiliniz için sermaye büyümesi ve düzenli gelir kombinasyonu hedeflenmektedir. Orta vadede benchmark endeksler ile uyumlu performans beklenmektedir.',
                riskBudget: 'Maksimum portföy düşüşü (drawdown) toleransı: %10-15. Yıllık volatilite hedefi: %10-18 aralığında. Portföyün %50-60\'ı orta riskli araçlarda, %20-30\'u düşük riskli araçlarda tutulmalıdır.',
                liquidityNeedLevel: 'Orta',
                liquidityExplanation: 'Dengeli profiliniz gereği, portföyün bir kısmı likit tutulurken, bir kısmı daha uzun vadeli yatırımlara yönlendirilebilir.',
                liquidityRecommendations: [
                    'Portföyün %15-25\'i yüksek likiditeye sahip fonlarda tutulmalı',
                    'Acil durum fonu olarak 3-6 aylık gider tutarı ayrılmalı',
                    'Orta vadeli kilitli yatırımlar toplam portföyün %30\'una kadar çıkabilir'
                ],
                timeHorizonCategory: 'Orta Vade (3-5 Yıl)',
                timeHorizonExplanation: 'Dengeli risk toleransınız ve büyüme-koruma dengeniz göz önüne alındığında, orta vadeli yatırım araçları ağırlıklı bir strateji uygulanmalıdır.',
                timeHorizonImplications: [
                    'Karma fonlar ve dengeli portföyler uygun araçlardır',
                    'Hisse senedi fonlarına %25-40 arası tahsis yapılabilir',
                    'Kira sertifikaları ve sukuk orta vadeli gelir sağlar'
                ],
                strategyName: 'Dengeli Büyüme Stratejisi',
                strategyRationale: 'Orta düzey risk toleransınız ve büyüme-koruma dengeniz doğrultusunda, karma bir varlık dağılımı uygulanmaktadır. Portföy, hem sermaye koruması hem de uzun vadeli büyüme sağlayacak şekilde yapılandırılmıştır.',
                allocations: {
                    'Para Piyasası': { range: '%15-25', rationale: 'Likidite tamponu ve fırsat fonu olarak' },
                    'Kira Sertifikası': { range: '%25-35', rationale: 'Düzenli gelir ve orta düzey risk' },
                    'Hisse/Katılım Endeksi': { range: '%25-40', rationale: 'Uzun vadeli büyüme potansiyeli' },
                    'Altın/Kıymetli Madenler': { range: '%10-15', rationale: 'Portföy çeşitlendirmesi ve enflasyon koruması' }
                },
                rebalancingPolicy: 'Portföy hedef dağılımından %5-7 sapma durumunda yeniden dengeleme yapılmalıdır. Çeyreklik periyodik kontroller ve yarıyıllık stratejik değerlendirme önerilir.',
                reviewFrequency: 'Çeyreklik',
                rebalancingCriteria: 'Hedef dağılımdan %5-7 sapma veya çeyreklik periyodik kontrol',
                reviewTriggers: [
                    'Varlık sınıfı ağırlığı hedef bantta %7\'den fazla saptığında',
                    'Piyasa koşullarında yapısal değişiklik olduğunda',
                    'Yatırımcının risk profilinde değişiklik tespit edildiğinde',
                    'Benchmark performansının altında kalındığında'
                ],
                performanceBenchmarks: [
                    'BIST-KYD Karma Fon Endeksi',
                    'BIST 100 Getiri Endeksi (hisse kıyaslama)',
                    'TÜFE + %4 (reel getiri hedefi)'
                ],
                communicationPlan: 'Çeyreklik performans raporu, yarıyıllık strateji değerlendirmesi ve yıllık kapsamlı IPS gözden geçirmesi yapılacaktır.'
            },
            high: {
                name: 'Agresif (Dinamik)',
                summary: 'Anket sonuçlarınıza göre agresif (dinamik) bir yatırımcı profili sergiliyorsunuz. Yüksek risk toleransınız ve büyüme odaklı hedefleriniz doğrultusunda, uzun vadeli sermaye kazancını maksimize eden bir strateji sizin için en uygun seçenektir.',
                demographics: 'Demografik verileriniz ve finansal durumunuz analiz edildiğinde, yüksek risk kapasitesi ile uzun vadeli büyüme odaklı bir portföy yapısı önerilmektedir. Güçlü gelir akışınız ve yüksek varlık tabanınız, piyasa dalgalanmalarını tolere etmenize olanak tanımaktadır.',
                personality: 'Yatırım kararlarınızda cesur ve fırsatçı bir yaklaşım sergiliyorsunuz. Piyasa düşüşlerini alım fırsatı olarak değerlendirme eğilimindesiniz ve yüksek getiri için yüksek risk almaya hazırsınız.',
                strengths: [
                    'Yüksek risk toleransı ile büyüme fırsatlarını değerlendirebiliyorsunuz',
                    'Piyasa dalgalanmalarına karşı psikolojik dayanıklılığınız yüksek',
                    'Uzun vadeli perspektifle yatırım yapabiliyorsunuz',
                    'Fırsat maliyetini iyi değerlendiriyorsunuz'
                ],
                attention: [
                    'Aşırı özgüven ve aşırı işlem yapma riskine dikkat edilmeli',
                    'Portföy konsantrasyonu riskini yönetmek için çeşitlendirme önemli',
                    'Büyük kayıplar sonrası duygusal karar vermekten kaçınılmalı',
                    'Kaldıraç kullanımı sınırlı tutulmalıdır'
                ],
                goalSummary: 'Birincil yatırım hedefiniz, uzun vadeli sermaye kazancını maksimize etmektir. Yüksek büyüme potansiyeli olan yatırım araçlarına ağırlık verilmesi hedeflenmektedir.',
                goals: ['Uzun vadeli yüksek sermaye büyümesi', 'Piyasa ortalamasının üzerinde getiri elde etmek', 'Büyüme potansiyeli yüksek sektörlere yatırım yapmak'],
                timeHorizon: 'Uzun vadeli (5+ yıl) bir yatırım ufku önerilmektedir. Agresif profiliniz, kısa vadeli dalgalanmaları tolere ederek uzun vadeli büyüme fırsatlarından yararlanmanıza olanak tanır. Hisse senedi fonları ve katılım endeks fonları temel araçlarınızdır.',
                returnExpectations: 'Hedef getiri: Enflasyon + %7-12 reel getiri. Agresif profiliniz için yüksek büyüme potansiyeli hedeflenmektedir. BIST 100 ve katılım endekslerinin üzerinde performans beklentisi mevcuttur.',
                riskBudget: 'Maksimum portföy düşüşü (drawdown) toleransı: %25-35. Yıllık volatilite hedefi: %20-30 aralığında kabul edilebilir. Portföyün %60-80\'i yüksek riskli büyüme odaklı araçlarda tutulabilir.',
                liquidityNeedLevel: 'Düşük',
                liquidityExplanation: 'Agresif profiliniz ve uzun vadeli yatırım ufkunuz gereği, portföyün büyük çoğunluğu uzun vadeli büyüme araçlarına yönlendirilebilir. Minimum likidite tamponu yeterlidir.',
                liquidityRecommendations: [
                    'Portföyün %5-10\'u acil likidite için ayrılmalı',
                    'Uzun vadeli yatırımlar toplam portföyün %70-80\'ini oluşturabilir',
                    'Piyasa fırsatları için %10-15 taktik nakit pozisyonu tutulabilir'
                ],
                timeHorizonCategory: 'Uzun Vade (5+ Yıl)',
                timeHorizonExplanation: 'Yüksek risk toleransınız ve büyüme odaklı hedefleriniz göz önüne alındığında, uzun vadeli yatırım araçları ağırlıklı bir strateji uygulanmalıdır.',
                timeHorizonImplications: [
                    'Hisse senedi ve katılım endeks fonları portföyün %50-70\'ini oluşturabilir',
                    'Kısa vadeli dalgalanmalar tolere edilebilir',
                    'Bileşik getiri etkisinden maksimum fayda sağlanır',
                    'Sektörel ve tematik fonlarla büyüme fırsatları değerlendirilebilir'
                ],
                strategyName: 'Agresif Büyüme Stratejisi',
                strategyRationale: 'Yüksek risk toleransınız ve uzun vadeli büyüme hedefleriniz doğrultusunda, hisse senedi ve katılım endeks fonları ağırlıklı bir varlık dağılımı uygulanmaktadır. Portföy, maksimum sermaye kazancı ve bileşik getiri sağlayacak şekilde yapılandırılmıştır.',
                allocations: {
                    'Hisse/Katılım Endeksi': { range: '%50-70', rationale: 'Uzun vadeli yüksek büyüme potansiyeli' },
                    'Altın/Kıymetli Madenler': { range: '%10-20', rationale: 'Portföy çeşitlendirmesi ve enflasyon koruması' },
                    'Kira Sertifikası': { range: '%10-20', rationale: 'Gelir akışı ve volatilite dengeleme' },
                    'Para Piyasası': { range: '%5-10', rationale: 'Minimum likidite tamponu ve fırsat fonu' }
                },
                rebalancingPolicy: 'Portföy hedef dağılımından %7-10 sapma durumunda yeniden dengeleme yapılmalıdır. Piyasa fırsatlarına göre taktik ayarlamalar yapılabilir.',
                reviewFrequency: 'Aylık',
                rebalancingCriteria: 'Hedef dağılımdan %7-10 sapma veya önemli piyasa fırsatı',
                reviewTriggers: [
                    'Hisse ağırlığı hedef bandın dışına çıktığında',
                    'Portföy drawdown %25\'i aştığında',
                    'Sektörel rotasyon fırsatı tespit edildiğinde',
                    'Makroekonomik göstergelerde önemli değişiklik olduğunda'
                ],
                performanceBenchmarks: [
                    'BIST Katılım 50 Getiri Endeksi',
                    'BIST 100 Getiri Endeksi',
                    'TÜFE + %8 (reel getiri hedefi)',
                    'MSCI Türkiye Endeksi (uluslararası kıyaslama)'
                ],
                communicationPlan: 'Aylık performans raporu, çeyreklik taktik değerlendirme ve yıllık kapsamlı strateji gözden geçirmesi yapılacaktır. Piyasa fırsatlarında anlık bilgilendirme yapılacaktır.'
            }
        };

        const p = profiles[profileType] || profiles.medium;
        const capacityScore = ipsData.riskAnalysis?.content?.riskCapacity?.score || profileScore;
        const willingnessScore = ipsData.riskAnalysis?.content?.riskWillingness?.score || profileScore;

        return {
            investor_profile: {
                summary: p.summary,
                demographics_analysis: p.demographics,
                investment_personality: p.personality,
                strengths: p.strengths,
                attention_points: p.attention
            },
            investment_goals: {
                primary_goal: p.goalSummary,
                secondary_goals: p.goals,
                time_horizon_analysis: p.timeHorizon,
                return_expectations: p.returnExpectations,
                risk_budget: p.riskBudget,
                ai_recommendation: `Risk profiliniz (${p.name}) ve skorunuz (${profileScore}/100) dikkate alındığında, ${profileType === 'high' ? 'büyüme odaklı ve dinamik' : profileType === 'low' ? 'sermaye koruma ağırlıklı' : 'dengeli'} bir yatırım stratejisi önerilmektedir.`
            },
            risk_analysis: {
                capacity_score: capacityScore,
                capacity_explanation: `Finansal durumunuz ve varlık tabanınız göz önüne alındığında, risk alma kapasiteniz ${capacityScore > 65 ? 'yüksek' : capacityScore > 35 ? 'orta' : 'düşük'} düzeyde olarak değerlendirilmiştir.`,
                willingness_score: willingnessScore,
                willingness_explanation: `Anket cevaplarınız, piyasa dalgalanmalarına karşı ${willingnessScore > 65 ? 'yüksek' : willingnessScore > 35 ? 'orta' : 'düşük'} düzey tolerans gösterdiğinizi ortaya koymaktadır.`,
                overall_assessment: `Risk kapasitesi (${capacityScore}/100) ve risk istekliliğiniz (${willingnessScore}/100) birlikte değerlendirildiğinde, ${p.name} bir yatırımcı profili ortaya çıkmaktadır.`,
                inconsistency_found: false
            },
            constraints: {
                ai_summary: `${p.name} risk profilinize uygun olarak, portföyünüzün ${profileType === 'low' ? '%30-50\'si' : profileType === 'high' ? '%5-10\'u' : '%15-25\'i'} likit varlıklardan oluşması önerilmektedir.`,
                liquidity: {
                    need_level: p.liquidityNeedLevel,
                    explanation: p.liquidityExplanation,
                    recommendations: p.liquidityRecommendations
                },
                time_horizon: {
                    category: p.timeHorizonCategory,
                    explanation: p.timeHorizonExplanation,
                    implications: p.timeHorizonImplications
                },
                tax_considerations: {
                    summary: 'Katılım finans uyumlu yatırım fonları, stopaj avantajı ve vergi optimizasyonu açısından değerlendirilmiştir.',
                    key_points: [
                        'Yatırım fonlarından elde edilen gelirler %10 stopaja tabidir',
                        'Bir yıldan uzun süre tutulan fonlarda %0 stopaj uygulanmaktadır',
                        'Katılım bankacılığı fonlarında faiz geliri bulunmadığından vergi avantajı sağlanır',
                        'Fon alım-satımlarında BSMV muafiyeti mevcuttur'
                    ]
                },
                legal_regulatory: {
                    summary: 'SPK düzenlemeleri ve katılım finans ilkeleri çerçevesinde yatırım yapılmaktadır.',
                    key_points: [
                        'Tüm fonlar SPK onaylı ve TEFAS üzerinden işlem görmektedir',
                        'Katılım finans ilkelerine uygunluk danışma kurulu tarafından denetlenmektedir',
                        'Yatırımcı tazmin fonu kapsamında koruma mevcuttur',
                        'MiFID II uyumlu yatırımcı profili değerlendirmesi yapılmıştır'
                    ]
                }
            },
            asset_strategy: {
                strategy_name: p.strategyName,
                strategy_rationale: p.strategyRationale,
                allocations: p.allocations,
                rebalancing_policy: p.rebalancingPolicy
            },
            esg_policy: {
                is_participatory: true,
                rationale: 'Kuveyt Türk Portföy fonları, katılım finans ilkelerine uygun olarak yönetilmektedir. Tüm yatırımlar danışma kurulu onayından geçmekte ve faizsiz finans prensiplerine uygunluk sürekli denetlenmektedir.',
                restrictions: [
                    'Faiz geliri içeren enstrümanlara yatırım yapılmaz',
                    'Alkol, tütün, silah ve kumar sektörlerine yatırım yapılmaz',
                    'Konvansiyonel bankacılık ve sigorta hisselerine yatırım yapılmaz',
                    'Haram gelir oranı %5\'i aşan şirketlere yatırım yapılmaz'
                ]
            },
            monitoring: {
                ai_note: p.monitoringNote || '',
                review_frequency: p.reviewFrequency,
                rebalancing_criteria: p.rebalancingCriteria,
                review_triggers: p.reviewTriggers,
                performance_benchmarks: p.performanceBenchmarks,
                communication_plan: p.communicationPlan
            }
        };
    },

    /**
     * HTML escape
     */
    escapeHtml: function (text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Tarih formatlama
     */
    formatDate: function (dateStr) {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Skor badge sınıfı
     */
    getScoreBadgeClass: function (score) {
        if (!score) return 'secondary';
        const numScore = parseInt(score);
        if (numScore >= 70) return 'success';
        if (numScore >= 40) return 'warning';
        return 'danger';
    },

    // ========== INTERACTIVITY ==========

    /**
     * Chart'ları render et - Gerçek fon verilerini kullanır
     */
    renderCharts: function () {
        // Varlık dağılımı chart'ı
        const allocationCanvas = document.getElementById('ipsAllocationChart');
        const container = document.getElementById('allocationChartContainer');

        if (!allocationCanvas || typeof Chart === 'undefined') {
            console.warn('[IPS Renderer] Chart canvas veya Chart.js bulunamadı');
            return;
        }

        // Gerçek fon dağılım verilerini localStorage'dan al
        const riskProfiliSonuc = JSON.parse(localStorage.getItem('riskProfiliSonuc') || '{}');
        const fonDagilimData = riskProfiliSonuc?.data?.fonDagilimData || [];

        // allocationRationale'i frontend profil bilgisiyle oluştur (backend tutarsızlığını önle)
        const riskData = riskProfiliSonuc?.data || {};

        // Risk skorunu doğru hesapla - her zaman survey cevaplarından
        let riskScoreForDisplay = riskData.riskScore;
        if (!riskScoreForDisplay && typeof IPS !== 'undefined' && IPS.calculateLocalRiskScore) {
            const surveyAnswers = JSON.parse(localStorage.getItem('surveyAnswers') || '{}');
            const localScores = IPS.calculateLocalRiskScore(surveyAnswers);
            riskScoreForDisplay = Math.round(localScores.total);
        }
        if (!riskScoreForDisplay) {
            riskScoreForDisplay = 50;
        }

        // profileName'i skor bazlı hesapla (backend bağımlılığını kaldır)
        let profileName;
        if (riskScoreForDisplay <= 35) profileName = 'low';
        else if (riskScoreForDisplay >= 65) profileName = 'high';
        else profileName = 'medium';
        const profileNames = { 'low': 'Sağlamcı', 'medium': 'Dengeli', 'high': 'Agresif' };
        const profileDisplayName = profileNames[profileName] || 'Dengeli';

        const allocationRationale = {
            algorithm_summary: `Portföy optimizasyonu, Modern Portföy Teorisi (Markowitz) ve katılım finans ilkeleri birleştirilerek gerçekleştirilmiştir. Risk skorunuz (${riskScoreForDisplay}/100) ve yatırımcı profiliniz (${profileDisplayName}) temel alınarak, ${profileName === 'low' ? 'sermaye koruma ağırlıklı' : profileName === 'high' ? 'büyüme odaklı' : 'dengeli risk-getiri'} bir dağılım oluşturulmuştur.`,
            risk_score_impact: `Risk skorunuz ${riskScoreForDisplay} olarak hesaplanmıştır. Bu skor, ${profileName === 'low' ? 'düşük' : profileName === 'high' ? 'yüksek' : 'orta'} düzey risk toleransına karşılık gelmektedir. Portföy dağılımı bu tolerans seviyesine göre optimize edilmiştir.`,
            ai_analysis: `Yapay zeka destekli analizimiz, anket cevaplarınızı değerlendirmiştir. Önerilen portföy dağılımının finansal hedefleriniz ve risk toleransınız ile uyumlu olduğu görülmektedir.`,
            key_factors: [
                `Risk Profili: ${profileDisplayName}`,
                `Risk Skoru: ${riskScoreForDisplay}/100`,
                `Optimizasyon: Maksimum Sharpe Oranı`
            ]
        };

        console.log('[IPS Renderer] Fon dağılım verisi:', fonDagilimData);

        // Varsayılan fallback verileri
        let labels = ['Para Piyasası', 'Kira Sertifikası', 'Dengeli Fonlar', 'Altın', 'Hisse'];
        let data = [40, 30, 15, 10, 5];
        const colors = ['#186149', '#42B38E', '#7CFFD4', '#EE5C2E', '#F9CA4F', '#FFA84A'];

        // Gerçek veriler varsa kullan
        if (fonDagilimData && fonDagilimData.length > 0) {
            labels = fonDagilimData.map(item => item.name);
            data = fonDagilimData.map(item => item.value);
        }

        const ctx = allocationCanvas.getContext('2d');

        // Mevcut chart'ı temizle
        if (window.ipsAllocationChartInstance && typeof window.ipsAllocationChartInstance.destroy === 'function') {
            window.ipsAllocationChartInstance.destroy();
        }

        // Chart oluştur
        window.ipsAllocationChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: data.map((_, i) => colors[i % colors.length]),
                    borderWidth: 2,
                    borderColor: '#fff',
                    cutout: '60%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            font: { size: 12 },
                            generateLabels: function (chart) {
                                const data = chart.data;
                                return data.labels.map((label, i) => ({
                                    text: `${label}: %${data.datasets[0].data[i].toFixed(1)}`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    strokeStyle: '#fff',
                                    lineWidth: 2,
                                    hidden: false,
                                    index: i
                                }));
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.label + ': %' + context.parsed.toFixed(2);
                            }
                        }
                    }
                }
            }
        });

        // Fon tablosu ve AI analizi ekle
        this.renderFundTableAndRationale(container, fonDagilimData, allocationRationale, colors);
    },

    /**
     * Fon tablosu ve AI gerekçe açıklamasını render et
     */
    renderFundTableAndRationale: function (container, fonDagilimData, allocationRationale, colors) {
        if (!container) return;

        // AI Gerekçe HTML
        let rationaleHtml = '';
        if (allocationRationale) {
            rationaleHtml = `
                <div class="ips-allocation-rationale uk-margin-top" style="padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; border-left: 4px solid var(--ips-primary, #186149);">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: bolt; ratio: 1.1;" style="color: var(--ips-primary, #186149);"></span>
                        <strong style="font-size: 1.1rem; color: var(--ips-primary, #186149);">Neden Bu Dağılım?</strong>
                    </div>
                    
                    <p style="margin: 0 0 16px 0; line-height: 1.7; font-size: 1rem;">${this.escapeHtml(allocationRationale.algorithm_summary || '')}</p>
                    
                    <div style="margin-top: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e9ecef;">
                        <strong style="font-size: 0.9rem; color: #186149;">📊 Risk Skoru Etkisi</strong>
                        <p style="margin: 8px 0 0 0; line-height: 1.6; font-size: 0.95rem;">${this.escapeHtml(allocationRationale.risk_score_impact || '')}</p>
                    </div>
                    
                    <div style="margin-top: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e9ecef;">
                        <strong style="font-size: 0.9rem; color: #186149;">🤖 AI Analizi</strong>
                        <p style="margin: 8px 0 0 0; line-height: 1.6; font-size: 0.95rem;">${this.escapeHtml(allocationRationale.ai_analysis || '')}</p>
                    </div>
                    
                    ${allocationRationale.key_factors && allocationRationale.key_factors.length > 0 ? `
                    <div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px;">
                        ${allocationRationale.key_factors.map(factor => `
                            <span style="background: var(--ips-primary, #186149); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem;">${this.escapeHtml(factor)}</span>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
            `;
        }

        // Fon detay tablosu HTML
        let fundTableHtml = '';
        if (fonDagilimData && fonDagilimData.length > 0) {
            fundTableHtml = `
                <div class="ips-fund-details uk-margin-top" style="padding: 16px; background: #fff; border-radius: 12px; border: 1px solid #e9ecef;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                        <span uk-icon="icon: list; ratio: 0.9;" style="color: var(--ips-primary, #186149);"></span>
                        <strong style="font-size: 1rem; color: var(--ips-primary, #186149);">Önerilen Fon Dağılımı</strong>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <thead>
                            <tr style="background: #f8f9fa; border-bottom: 2px solid #e9ecef;">
                                <th style="padding: 10px 8px; text-align: left;">Fon Adı</th>
                                <th style="padding: 10px 8px; text-align: center;">Oran</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${fonDagilimData.map((item, i) => {
                const color = colors[i % colors.length];
                return `
                                    <tr style="border-bottom: 1px solid #e9ecef;">
                                        <td style="padding: 10px 8px;">
                                            <div style="display: flex; align-items: center; gap: 8px;">
                                                <span style="width: 10px; height: 10px; border-radius: 50%; background: ${color};"></span>
                                                <span style="font-weight: 500;">${this.escapeHtml(item.name)}</span>
                                            </div>
                                        </td>
                                        <td style="padding: 10px 8px; text-align: center; font-weight: 600; color: var(--ips-primary, #186149);">%${item.value.toFixed(2)}</td>
                                    </tr>
                                `;
            }).join('')}
                        </tbody>
                    </table>
                    <div style="margin-top: 12px; padding: 10px; background: #f8f9fa; border-radius: 8px; font-size: 0.85rem; color: #666;">
                        <strong>Not:</strong> Tüm önerilen fonlar Kuveyt Türk Portföy Yönetimi A.Ş. tarafından yönetilen, katılım finans ilkelerine uygun yatırım araçlarıdır.
                    </div>
                </div>
            `;
        }

        // Ekstra içerikleri container'a ekle
        if (rationaleHtml || fundTableHtml) {
            container.insertAdjacentHTML('beforeend', rationaleHtml + fundTableHtml);
        }
    },

    /**
     * Event listener'ları bağla
     */
    attachEventListeners: function () {
        // Editable alanlar için
        document.querySelectorAll('.ips-editable').forEach(el => {
            el.addEventListener('blur', () => {
                const field = el.dataset.field;
                if (field) {
                    this.changedFields[field] = el.textContent;
                }
            });
        });

        // Smooth scroll for TOC links
        document.querySelectorAll('.ips-toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    },

    applySavedCustomizations: function () {
        let saved = {};
        try {
            saved = JSON.parse(localStorage.getItem('ipsCustomizations') || '{}');
        } catch (e) {
            console.warn('[IPS] Customization parse error', e);
            return;
        }
        Object.entries(saved).forEach(([field, value]) => {
            const el = document.querySelector(`[data-field="${field}"]`);
            if (el && typeof value === 'string') {
                el.textContent = value;
            }
        });
    },

    /**
     * Düzenleme modunu aç/kapat
     */
    toggleEditMode: function () {
        this.editMode = !this.editMode;
        const report = document.getElementById('ipsFullReport');
        const editBtn = document.getElementById('editModeBtn');
        const saveBtn = document.getElementById('saveBtn');

        const editableElements = document.querySelectorAll('.ips-editable');

        if (this.editMode) {
            report.classList.add('ips-edit-mode');
            if (editBtn) editBtn.querySelector('.edit-btn-text').textContent = 'Düzenlemeyi Bitir';
            if (saveBtn) saveBtn.style.display = 'inline-flex';

            // Tüm editable alanları aç
            editableElements.forEach(el => {
                el.setAttribute('contenteditable', 'true');
            });
        } else {
            report.classList.remove('ips-edit-mode');
            if (editBtn) editBtn.querySelector('.edit-btn-text').textContent = 'Düzenle';
            if (saveBtn) saveBtn.style.display = 'none';

            // Tüm contenteditable'ları kapat
            editableElements.forEach(el => {
                el.setAttribute('contenteditable', 'false');
            });
        }
    },

    /**
     * Değişiklikleri kaydet
     */
    saveChanges: function () {
        if (Object.keys(this.changedFields).length === 0) {
            alert('Kaydedilecek değişiklik bulunamadı.');
            return;
        }

        // LocalStorage'a kaydet
        try {
            const existingChanges = JSON.parse(localStorage.getItem('ipsCustomizations') || '{}');
            const merged = { ...existingChanges, ...this.changedFields };
            localStorage.setItem('ipsCustomizations', JSON.stringify(merged));

            this.changedFields = {};
            this.toggleEditMode();

            // Başarı bildirimi
            if (typeof UIkit !== 'undefined') {
                UIkit.notification({
                    message: 'Değişiklikler kaydedildi',
                    status: 'success',
                    pos: 'top-right',
                    timeout: 3000
                });
            } else {
                alert('Değişiklikler kaydedildi.');
            }
        } catch (e) {
            console.error('Kaydetme hatası:', e);
            alert('Değişiklikler kaydedilemedi.');
        }
    },

    /**
     * Bölüm daralt/genişlet
     */
    collapseSection: function (sectionId) {
        const body = document.getElementById(`${sectionId}-body`);
        const btn = document.querySelector(`#${sectionId} .ips-section-actions button`);

        if (body.style.display === 'none') {
            body.style.display = 'block';
            btn.innerHTML = '<span uk-icon="icon: chevron-up; ratio: 0.8"></span>';
        } else {
            body.style.display = 'none';
            btn.innerHTML = '<span uk-icon="icon: chevron-down; ratio: 0.8"></span>';
        }
    },

    /**
     * PDF export - Gotenberg üzerinden profesyonel PDF oluşturur
     */
    exportPDF: async function () {
        if (this.pdfInProgress) {
            this.notifyUser('PDF hazırlanıyor. Lütfen bekleyin...', 'warning');
            return;
        }
        this.pdfInProgress = true;
        this.setToolbarDisabled(true);
        this.showPdfOverlay('PDF servisi kontrol ediliyor...', 'Bağlantı doğrulanıyor', 'info');

        const reportElement = document.getElementById('ipsFullReport');

        if (!reportElement) {
            console.error('[IPS PDF] IPS rapor elementi bulunamadı');
            this.hidePdfOverlay();
            this.resetPdfState();
            this.printReport(); // Fallback
            return;
        }

        if (!this.confirmApprovalBeforeExport()) {
            this.hidePdfOverlay();
            this.resetPdfState();
            return;
        }

        const availability = await this.checkPdfServiceAvailability();
        if (!availability.ok || !availability.gotenberg) {
            const reason = availability.message || 'PDF servisi şu anda kullanılamıyor.';
            this.notifyUser(reason, 'warning');
            this.updatePdfOverlay('PDF servisi kullanılamıyor', reason, 'error');
            const proceedPrint = window.confirm(`${reason}\n\nYazdırma moduna geçmek ister misiniz?`);
            this.hidePdfOverlay();
            this.resetPdfState();
            if (proceedPrint) {
                this.printReport();
            }
            return;
        }

        const responseTimeText = availability.responseTimeMs ? `Gotenberg: ${availability.responseTimeMs} ms` : '';
        const waitText = responseTimeText ? `Lütfen bekleyin • ${responseTimeText}` : 'Lütfen bekleyin';
        this.updatePdfOverlay('PDF oluşturuluyor...', waitText, 'success');

        try {
            // Sadece rapor içeriğini al (toolbar ve no-print elementleri hariç)
            const clone = reportElement.cloneNode(true);

            // no-print elementlerini kaldır
            clone.querySelectorAll('.no-print').forEach(el => el.remove());
            clone.querySelectorAll('#ipsToolbar').forEach(el => el.remove());
            clone.querySelectorAll('.ips-toolbar').forEach(el => el.remove());
            clone.querySelectorAll('button').forEach(el => el.remove());

            // Canvas'ları (chart) base64 image'a çevir
            const originalCanvases = reportElement.querySelectorAll('canvas');
            const clonedCanvases = clone.querySelectorAll('canvas');
            clonedCanvases.forEach((canvas, i) => {
                const origCanvas = originalCanvases[i];
                if (origCanvas) {
                    const img = document.createElement('img');
                    img.src = origCanvas.toDataURL('image/png');
                    img.style.cssText = 'max-width: 100%; height: auto;';
                    canvas.parentNode.replaceChild(img, canvas);
                }
            });

            const htmlContent = clone.innerHTML;

            // Backend'e gönder - use config URL
            const pdfUrl = window.IPS_CONFIG?.pdfUrl || 'http://localhost:8001/api/ips/generate-pdf';
            const response = await fetch(pdfUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    html: htmlContent,
                    filename: `IPS-Raporu-${new Date().toISOString().slice(0, 10)}.pdf`
                })
            });

            if (!response.ok) {
                throw new Error(`PDF oluşturulamadı: ${response.status}`);
            }

            // PDF'i al ve işle
            const pdfBlob = await response.blob();
            const filename = `IPS-Raporu-${new Date().toISOString().slice(0, 10)}.pdf`;

            // Data URL oluştur (Mac Chrome için en güvenilir yöntem)
            const reader = new FileReader();
            reader.onloadend = () => {
                // Yeni sekmede PDF aç
                const pdfWindow = window.open('', '_blank');
                if (pdfWindow) {
                    pdfWindow.document.write(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <title>${filename}</title>
                            <style>
                                * { margin: 0; padding: 0; }
                                body { 
                                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                                    background: #1a1a1a;
                                }
                                .toolbar {
                                    position: fixed;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    background: #2d2d2d;
                                    padding: 12px 20px;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    z-index: 1000;
                                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                                }
                                .toolbar h3 {
                                    color: #fff;
                                    font-size: 14px;
                                    font-weight: 500;
                                }
                                .download-btn {
                                    background: #186149;
                                    color: white;
                                    border: none;
                                    padding: 10px 20px;
                                    border-radius: 4px;
                                    cursor: pointer;
                                    font-size: 14px;
                                    text-decoration: none;
                                    display: inline-flex;
                                    align-items: center;
                                    gap: 8px;
                                }
                                .download-btn:hover { background: #134e3b; }
                                iframe {
                                    width: 100%;
                                    height: calc(100vh - 60px);
                                    margin-top: 60px;
                                    border: none;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="toolbar">
                                <h3>${filename}</h3>
                                <a href="${reader.result}" download="${filename}" class="download-btn">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    İndir
                                </a>
                            </div>
                            <iframe src="${reader.result}"></iframe>
                        </body>
                        </html>
                    `);
                    pdfWindow.document.close();
                    console.log('[IPS PDF] PDF yeni sekmede açıldı:', filename);
                } else {
                    // Popup engellendiyse doğrudan indirmeyi dene
                    console.warn('[IPS PDF] Popup engellendi, doğrudan indirme deneniyor');
                    const link = document.createElement('a');
                    link.href = reader.result;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            };
            reader.readAsDataURL(pdfBlob);

            console.log('[IPS PDF] PDF işleniyor...', filename);

        } catch (error) {
            console.error('[IPS PDF] Hata:', error);

            // Fallback: Tarayıcının yazdırma dialog'unu aç
            if (typeof UIkit !== 'undefined') {
                UIkit.notification({
                    message: 'PDF servisi kullanılamıyor. Tarayıcı yazdırma açılıyor...',
                    status: 'warning',
                    pos: 'top-right',
                    timeout: 3000
                });
            }

            setTimeout(() => this.printReport(), 500);

        } finally {
            this.hidePdfOverlay();
            this.resetPdfState();
        }
    },

    printReport: function () {
        if (!this.confirmApprovalBeforeExport()) {
            return;
        }
        window.print();
    },

    confirmApprovalBeforeExport: function () {
        const missing = this.getMissingApprovalFields();
        if (!missing.length) return true;

        const message = `Aşağıdaki alanlar eksik görünüyor:\\n- ${missing.join('\\n- ')}\\n\\nYine de devam etmek istiyor musunuz?`;
        return window.confirm(message);
    },

    getMissingApprovalFields: function () {
        const missing = [];
        const investorName = this.getApprovalFieldValue('approval.investorName');
        const employeeName = this.getApprovalFieldValue('approval.employeeName');
        const employeeTitle = this.getApprovalFieldValue('approval.employeeTitle');
        const signatures = this.getSignatureStore();

        if (!investorName) missing.push('Yatırımcı adı');
        if (!signatures?.investor?.dataUrl) missing.push('Yatırımcı imzası');
        if (!employeeName) missing.push('Yetkili adı');
        if (!employeeTitle) missing.push('Yetkili ünvanı');
        if (!signatures?.employee?.dataUrl) missing.push('Yetkili imzası');

        return missing;
    },

    getApprovalFieldValue: function (field) {
        const el = document.querySelector(`[data-field="${field}"]`);
        if (!el) return '';
        return String(el.textContent || '').trim();
    },

    setToolbarDisabled: function (disabled) {
        const buttons = document.querySelectorAll('.ips-toolbar-actions .ips-btn');
        buttons.forEach((btn) => {
            if (disabled) {
                btn.setAttribute('disabled', 'disabled');
                btn.classList.add('is-disabled');
            } else {
                btn.removeAttribute('disabled');
                btn.classList.remove('is-disabled');
            }
        });
    },

    notifyUser: function (message, status) {
        if (typeof UIkit !== 'undefined') {
            UIkit.notification({
                message: message,
                status: status || 'primary',
                pos: 'top-right',
                timeout: 3000
            });
        } else {
            alert(message);
        }
    },

    resetPdfState: function () {
        this.pdfInProgress = false;
        this.setToolbarDisabled(false);
    },

    showPdfOverlay: function (title, subtitle, status) {
        this.hidePdfOverlay();
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'pdfLoadingOverlay';
        loadingOverlay.innerHTML = `
            <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div style="background: white; padding: 32px 48px; border-radius: 12px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
                    <div id="pdfLoadingIcon" style="margin: 0 auto 12px; width: 44px; height: 44px;">${this.getPdfOverlayIcon(status || 'info')}</div>
                    <div style="width: 40px; height: 40px; border: 3px solid #186149; border-top-color: transparent; border-radius: 50%; margin: 0 auto 16px; animation: spin 1s linear infinite;"></div>
                    <p id="pdfLoadingTitle" style="margin: 0; font-size: 16px; color: #333;">${this.escapeHtml(title || 'PDF oluşturuluyor...')}</p>
                    <p id="pdfLoadingSubtitle" style="margin: 8px 0 0; font-size: 12px; color: #666;">${this.escapeHtml(subtitle || 'Lütfen bekleyin')}</p>
                </div>
            </div>
            <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
        `;
        document.body.appendChild(loadingOverlay);
    },

    updatePdfOverlay: function (title, subtitle, status) {
        const overlay = document.getElementById('pdfLoadingOverlay');
        if (!overlay) return;
        const titleEl = overlay.querySelector('#pdfLoadingTitle');
        const subtitleEl = overlay.querySelector('#pdfLoadingSubtitle');
        const iconEl = overlay.querySelector('#pdfLoadingIcon');
        if (titleEl && title !== undefined) titleEl.textContent = title;
        if (subtitleEl && subtitle !== undefined) subtitleEl.textContent = subtitle;
        if (iconEl && status) iconEl.innerHTML = this.getPdfOverlayIcon(status);
    },

    hidePdfOverlay: function () {
        const overlay = document.getElementById('pdfLoadingOverlay');
        if (overlay) overlay.remove();
    },

    getPdfOverlayIcon: function (status) {
        const colorMap = {
            info: '#186149',
            success: '#1B7F5A',
            warning: '#F5A623',
            error: '#D64545'
        };
        const color = colorMap[status] || colorMap.info;
        return `
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9"></circle>
                ${status === 'success'
                ? '<path d="M8 12l2.5 2.5L16 9"></path>'
                : status === 'warning'
                    ? '<path d="M12 7v6"></path><path d="M12 17h.01"></path>'
                    : status === 'error'
                        ? '<path d="M9 9l6 6"></path><path d="M15 9l-6 6"></path>'
                        : '<path d="M12 8h.01"></path><path d="M12 12v4"></path>'}
            </svg>
        `;
    },

    checkPdfServiceAvailability: async function () {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        try {
            const pdfHealthUrl = window.IPS_CONFIG?.pdfHealthUrl || 'http://localhost:8001/api/ips/pdf-health';
            const response = await fetch(pdfHealthUrl, {
                method: 'GET',
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                return { ok: false, gotenberg: false, message: 'PDF servisine ulaşılamıyor (backend hatası).' };
            }
            const data = await response.json();
            if (!data.gotenberg) {
                const url = data.gotenbergUrl ? ` (${data.gotenbergUrl})` : '';
                return { ok: true, gotenberg: false, message: `PDF servisi çalışmıyor, Gotenberg erişilemedi${url}.` };
            }
            return { ok: true, gotenberg: true, responseTimeMs: data.responseTimeMs };
        } catch (e) {
            clearTimeout(timeoutId);
            return { ok: false, gotenberg: false, message: 'PDF servisine bağlantı kurulamadı.' };
        }
    },

    // --- Signature Handling ---

    signaturePad: null,
    activeSignatureTarget: 'investor',

    getSignatureStore: function () {
        try {
            return JSON.parse(localStorage.getItem('ipsSignatureData') || '{}');
        } catch (e) {
            console.warn('[IPS] Signature store parse error', e);
            return {};
        }
    },

    setSignatureStore: function (store) {
        try {
            localStorage.setItem('ipsSignatureData', JSON.stringify(store || {}));
        } catch (e) {
            console.warn('[IPS] Signature store save error', e);
        }
    },

    applySavedSignatures: function () {
        const store = this.getSignatureStore();
        ['investor', 'employee'].forEach((target) => {
            const payload = store[target];
            if (!payload || !payload.dataUrl) return;
            const elements = this.getSignatureElements(target);
            const container = document.getElementById(elements.containerId);
            const img = document.getElementById(elements.imageId);
            const btn = document.getElementById(elements.buttonId) || (elements.fallbackButtonId ? document.getElementById(elements.fallbackButtonId) : null);
            const line = document.getElementById(elements.lineId);

            if (img) img.src = payload.dataUrl;
            if (container) container.style.display = 'block';
            if (btn) btn.style.display = 'none';
            if (line) line.style.display = 'none';
        });
    },

    getSignatureElements: function (target) {
        const map = {
            investor: {
                containerId: 'investorSignatureContainer',
                imageId: 'investorSignatureImage',
                buttonId: 'addInvestorSignatureBtn',
                fallbackButtonId: 'addSignatureBtn',
                lineId: 'investorSignatureLine'
            },
            employee: {
                containerId: 'employeeSignatureContainer',
                imageId: 'employeeSignatureImage',
                buttonId: 'addEmployeeSignatureBtn',
                lineId: 'employeeSignatureLine'
            }
        };
        return map[target] || map.investor;
    },

    openSignatureModal: function (target) {
        this.activeSignatureTarget = target || 'investor';
        const modal = document.getElementById('signatureModal');
        if (!modal) {
            console.error('[IPS] Signature modal not found');
            return;
        }

        // Move modal to body to avoid transform context issues
        if (modal.parentElement !== document.body) {
            document.body.appendChild(modal);
        }

        // Add UIkit's open class and set visibility
        modal.classList.add('uk-open');
        modal.style.display = 'block';
        modal.style.opacity = '1';

        // Also set dialog visibility explicitly
        const dialog = modal.querySelector('.uk-modal-dialog');
        if (dialog) {
            dialog.style.opacity = '1';
            dialog.style.visibility = 'visible';
        }

        if (!this.signaturePad) {
            this.initSignaturePad();
        } else {
            // Re-adjust canvas size specifically when opening modal
            const canvas = document.getElementById('signaturePad');
            if (canvas) {
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = 200;
                this.signaturePad.clear(); // Clear on reopen for new start
            }
        }
    },

    closeSignatureModal: function () {
        const modal = document.getElementById('signatureModal');
        if (modal) {
            modal.classList.remove('uk-open');
            modal.style.display = 'none';
            modal.style.opacity = '0';

            // Reset dialog opacity
            const dialog = modal.querySelector('.uk-modal-dialog');
            if (dialog) {
                dialog.style.opacity = '';
                dialog.style.visibility = '';
            }
        }
        // Reset state
        this.switchSignatureTab('draw');
        if (this.signaturePad) {
            this.signaturePad.clear();
        }
        const uploadPreview = document.getElementById('uploadPreview');
        if (uploadPreview) uploadPreview.style.display = 'none';
        const fileInput = document.getElementById('signatureFileInput');
        if (fileInput) fileInput.value = '';
    },

    switchSignatureTab: function (tab) {
        // UIkit tabs handle the class switching usually, but we need to manage content visibility manually if not using full UIkit JS
        const drawTab = document.getElementById('tab-draw');
        const uploadTab = document.getElementById('tab-upload');
        const tabs = document.querySelectorAll('#signatureModal ul[uk-tab] li');

        if (tab === 'draw') {
            drawTab.style.display = 'block';
            uploadTab.style.display = 'none';
            tabs[0].classList.add('uk-active');
            tabs[1].classList.remove('uk-active');
            // Resize canvas when tab becomes visible
            if (this.signaturePad) {
                const canvas = document.getElementById('signaturePad');
                canvas.width = canvas.parentElement.offsetWidth;
                this.signaturePad.clear(); // Clear on resize to avoid scaling artifacts
            }
        } else {
            drawTab.style.display = 'none';
            uploadTab.style.display = 'block';
            tabs[0].classList.remove('uk-active');
            tabs[1].classList.add('uk-active');
        }
    },

    initSignaturePad: function () {
        // Load signature_pad library if not present
        if (typeof SignaturePad === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/signature_pad@4.1.7/dist/signature_pad.umd.min.js';
            script.onload = () => {
                this._initPad();
            };
            document.head.appendChild(script);
        } else {
            this._initPad();
        }
    },

    _initPad: function () {
        const canvas = document.getElementById('signaturePad');
        if (canvas) {
            // Fix canvas resolution for high DPI screens
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.parentElement.offsetWidth * ratio;
            canvas.height = 200 * ratio;
            canvas.getContext("2d").scale(ratio, ratio);

            // Adjust CSS size
            canvas.style.width = "100%";
            canvas.style.height = "200px";

            this.signaturePad = new SignaturePad(canvas, {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                penColor: 'rgb(0, 0, 0)'
            });

            // Handle window resize
            window.addEventListener("resize", () => {
                // Simple reset on resize
                // In a pro app we would save data, resize, load data
            });
        }
    },

    clearSignaturePad: function () {
        if (this.signaturePad) {
            this.signaturePad.clear();
        }
    },

    handleSignatureUpload: function (input) {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const preview = document.getElementById('uploadPreview');
                const img = document.getElementById('uploadPreviewImg');
                img.src = e.target.result;
                preview.style.display = 'block';
            };

            reader.readAsDataURL(file);
        }
    },

    saveSignature: function () {
        let signatureData = null;
        const activeTab = document.querySelector('#signatureModal ul[uk-tab] li.uk-active').innerText.trim();

        if (activeTab === 'Çiz') {
            if (this.signaturePad && !this.signaturePad.isEmpty()) {
                signatureData = this.signaturePad.toDataURL();
            } else {
                alert('Lütfen bir imza çizin.');
                return;
            }
        } else {
            // Upload
            const img = document.getElementById('uploadPreviewImg');
            if (img.src && img.src.startsWith('data:')) {
                signatureData = img.src;
            } else {
                alert('Lütfen bir imza dosyası yükleyin.');
                return;
            }
        }

        if (signatureData) {
            const target = this.activeSignatureTarget || 'investor';
            const elements = this.getSignatureElements(target);
            const container = document.getElementById(elements.containerId);
            const img = document.getElementById(elements.imageId);
            const btn = document.getElementById(elements.buttonId) || (elements.fallbackButtonId ? document.getElementById(elements.fallbackButtonId) : null);
            const line = document.getElementById(elements.lineId);

            if (img) img.src = signatureData;
            if (container) container.style.display = 'block';
            if (btn) btn.style.display = 'none';
            if (line) line.style.display = 'none';

            const store = this.getSignatureStore();
            store[target] = {
                dataUrl: signatureData,
                updatedAt: new Date().toISOString()
            };
            this.setSignatureStore(store);

            this.closeSignatureModal();
        }
    },

    removeSignature: function (target) {
        const elements = this.getSignatureElements(target || 'investor');
        const container = document.getElementById(elements.containerId);
        const img = document.getElementById(elements.imageId);
        const btn = document.getElementById(elements.buttonId) || (elements.fallbackButtonId ? document.getElementById(elements.fallbackButtonId) : null);
        const line = document.getElementById(elements.lineId);

        if (img) img.src = '';
        if (container) container.style.display = 'none';
        if (btn) btn.style.display = 'inline-flex';
        if (line) line.style.display = 'block';

        const store = this.getSignatureStore();
        if (store[target || 'investor']) {
            delete store[target || 'investor'];
            this.setSignatureStore(store);
        }
    }
};

// Global erişim için
window.IPSReportRenderer = IPSReportRenderer;
