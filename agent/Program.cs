using Docker.DotNet;
using Docker.DotNet.Models;


Console.WriteLine("Hello, World!");

DockerClient client = new DockerClientConfiguration(
    new Uri("http://host.docker.internal:4243"))
     .CreateClient();

IList<ContainerListResponse> containers = await client.Containers.ListContainersAsync(
    new ContainersListParameters()
    {
        Limit = 10,
    }
);

Console.WriteLine(containers);
Console.WriteLine("Hello, World!");
