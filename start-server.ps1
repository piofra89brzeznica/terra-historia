# TerraHistoria — Lokalny serwer podglądu dla Windows (bez potrzeby instalacji Node.js ani Pythona)
param(
  [int]$Port = 8080
)

$Root = Join-Path $PSScriptRoot "www"
$Listener = New-Object System.Net.HttpListener
$Listener.Prefixes.Add("http://localhost:$Port/")
$Listener.Start()

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Yellow
Write-Host "  TerraHistoria dziala pod adresem: http://localhost:$Port" -ForegroundColor Green
Write-Host "  Nacisnij Ctrl+C, aby zatrzymac serwer." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Yellow
Write-Host ""

$MimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".ico"  = "image/x-icon"
  ".webmanifest" = "application/manifest+json"
}

try {
  while ($Listener.IsListening) {
    $Context = $Listener.GetContext()
    $ReqPath = $Context.Request.Url.AbsolutePath
    if ($ReqPath -eq "/") { $ReqPath = "/index.html" }

    $SafePath = $ReqPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
    $FullPath = Join-Path $Root $SafePath

    if ((Test-Path $FullPath) -and -not (Get-Item $FullPath).PSIsContainer) {
      $Ext = [System.IO.Path]::GetExtension($FullPath).ToLower()
      $ContentType = if ($MimeTypes.ContainsKey($Ext)) { $MimeTypes[$Ext] } else { "application/octet-stream" }
      $Bytes = [System.IO.File]::ReadAllBytes($FullPath)
      $Context.Response.ContentType = $ContentType
      $Context.Response.ContentLength64 = $Bytes.Length
      $Context.Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
    } else {
      $Context.Response.StatusCode = 404
      $Msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
      $Context.Response.OutputStream.Write($Msg, 0, $Msg.Length)
    }
    $Context.Response.Close()
  }
} finally {
  $Listener.Stop()
}
