$baseURL = 'http://localhost:3000'

# Test 1: POST /order - Criar novo pedido
Write-Host "1️⃣ POST /order - Criar novo pedido" -ForegroundColor Cyan
try {
  $body = @{
    numeroPedido = "v10089015vdb-01"
    valorTotal = 10000
    dataCriacao = "2023-07-19T12:24:11.5299601+00:00"
    items = @(
      @{
        idItem = "2434"
        quantidadeItem = 1
        valorItem = 1000
      }
    )
  } | ConvertTo-Json -Depth 10

  $response = Invoke-RestMethod -Uri "$baseURL/order" -Method POST -Body $body -ContentType "application/json"
  Write-Host "✅ Status: 201 Created" -ForegroundColor Green
  $response | ConvertTo-Json -Depth 10 | Write-Host
} catch {
  Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n============================================================`n"

# Test 2: GET /order/:orderId - Obter um pedido
Write-Host "2️⃣ GET /order/:orderId - Obter pedido por ID" -ForegroundColor Cyan
try {
  $response = Invoke-RestMethod -Uri "$baseURL/order/v10089015vdb" -Method GET -ContentType "application/json"
  Write-Host "✅ Status: 200 OK" -ForegroundColor Green
  $response | ConvertTo-Json -Depth 10 | Write-Host
} catch {
  Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n============================================================`n"

# Test 3: GET /order/list - Listar todos
Write-Host "3️⃣ GET /order/list - Listar todos os pedidos" -ForegroundColor Cyan
try {
  $response = Invoke-RestMethod -Uri "$baseURL/order/list" -Method GET -ContentType "application/json"
  Write-Host "✅ Status: 200 OK" -ForegroundColor Green
  $response | ConvertTo-Json -Depth 10 | Write-Host
} catch {
  Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n============================================================`n"

# Test 4: PUT /order/:orderId - Atualizar
Write-Host "4️⃣ PUT /order/:orderId - Atualizar pedido" -ForegroundColor Cyan
try {
  $body = @{
    numeroPedido = "v10089015vdb-01"
    valorTotal = 15000
    dataCriacao = "2023-07-19T12:24:11.5299601+00:00"
    items = @(
      @{
        idItem = "2434"
        quantidadeItem = 2
        valorItem = 1500
      }
    )
  } | ConvertTo-Json -Depth 10

  $response = Invoke-RestMethod -Uri "$baseURL/order/v10089015vdb" -Method PUT -Body $body -ContentType "application/json"
  Write-Host "✅ Status: 200 OK" -ForegroundColor Green
  $response | ConvertTo-Json -Depth 10 | Write-Host
} catch {
  Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n============================================================`n"

# Test 5: DELETE /order/:orderId - Deletar
Write-Host "5️⃣ DELETE /order/:orderId - Deletar pedido" -ForegroundColor Cyan
try {
  $response = Invoke-RestMethod -Uri "$baseURL/order/v10089015vdb" -Method DELETE -ContentType "application/json"
  Write-Host "✅ Status: 200 OK" -ForegroundColor Green
  $response | ConvertTo-Json -Depth 10 | Write-Host
} catch {
  Write-Host "❌ Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n✨ Testes concluídos!`n" -ForegroundColor Yellow
