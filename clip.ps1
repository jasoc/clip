# Questo è lo script PowerShell equivalente
param(
    [string]$profile
)

$additionalArgs = $args[0..($args.Length - 1)]
docker compose -f compose.base.yml -f ("compose.$profile.yml") @additionalArgs