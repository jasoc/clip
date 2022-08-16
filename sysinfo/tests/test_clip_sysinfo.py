from clip_sysinfo import createCurrentServer

def test_server_object():
    srv = createCurrentServer()
    print(srv)
    print(srv.networks)