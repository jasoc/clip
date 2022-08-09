from clip_sysinfo import Server

def test_server_object():
    srv = Server.Detect()
    print(srv)
