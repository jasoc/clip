using Docker.DotNet;
using Docker.DotNet.Models;

var test = new Dictionary<string, dynamic>() { };

Console.WriteLine("Hello, World!");

DockerClient client = new DockerClientConfiguration(
    new Uri("http://ubuntu-docker.cloudapp.net:4243"))
     .CreateClient();


IList<ContainerListResponse> containers = await client.Containers.ListContainersAsync(
    new ContainersListParameters()
    {
        Limit = 10,
    }
);

Console.WriteLine(containers);
Console.WriteLine(containers);