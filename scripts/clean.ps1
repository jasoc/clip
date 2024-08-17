$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
$CLIP_PROJECT_PATH = (Resolve-Path "$ScriptPath\..").Path

docker container rm clip-spa:debug clip-apiserver-debug clip-apiserver clip-spa --force
docker image rm clip/spa:debug clip/apiserver:debug clip/spa clip/apiserver

$directories = @(
    "$CLIP_PROJECT_PATH\dist",
    "$CLIP_PROJECT_PATH\spa\dist",
    "$CLIP_PROJECT_PATH\spa\node_modules",
    "$CLIP_PROJECT_PATH\spa\.angular",
    "$CLIP_PROJECT_PATH\apiserver\.venv",
    "$CLIP_PROJECT_PATH\apiserver\dist"
)

foreach ($dir in $directories) {
    if (Test-Path $dir) {
        Remove-Item -Recurse -Force $dir
    }
}