import http from 'http';

function makeRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (body) {
      const jsonBody = JSON.stringify(body);
      options.headers['Content-Length'] = Buffer.byteLength(jsonBody);
    }

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data
          });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Iniciando testes da API...\n');

  try {
    // Test 1: Criar um pedido (POST)
    console.log('1️⃣ POST /order - Criar novo pedido');
    const createResponse = await makeRequest('POST', '/order', {
      numeroPedido: 'v10089015vdb-01',
      valorTotal: 10000,
      dataCriacao: '2023-07-19T12:24:11.5299601+00:00',
      items: [
        {
          idItem: '2434',
          quantidadeItem: 1,
          valorItem: 1000
        }
      ]
    });
    console.log('✅ Status:', createResponse.status);
    console.log('✅ Response:', JSON.stringify(createResponse.data, null, 2));

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 2: Obter um pedido (GET)
    console.log('2️⃣ GET /order/:orderId - Obter pedido');
    const getResponse = await makeRequest('GET', '/order/v10089015vdb');
    console.log('✅ Status:', getResponse.status);
    console.log('✅ Response:', JSON.stringify(getResponse.data, null, 2));

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 3: Listar todos os pedidos (GET /list)
    console.log('3️⃣ GET /order/list - Listar todos os pedidos');
    const listResponse = await makeRequest('GET', '/order/list');
    console.log('✅ Status:', listResponse.status);
    console.log('✅ Response:', JSON.stringify(listResponse.data, null, 2));

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 4: Atualizar um pedido (PUT)
    console.log('4️⃣ PUT /order/:orderId - Atualizar pedido');
    const updateResponse = await makeRequest('PUT', '/order/v10089015vdb', {
      numeroPedido: 'v10089015vdb-01',
      valorTotal: 15000,
      dataCriacao: '2023-07-19T12:24:11.5299601+00:00',
      items: [
        {
          idItem: '2434',
          quantidadeItem: 2,
          valorItem: 1500
        }
      ]
    });
    console.log('✅ Status:', updateResponse.status);
    console.log('✅ Response:', JSON.stringify(updateResponse.data, null, 2));

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 5: Deletar um pedido (DELETE)
    console.log('5️⃣ DELETE /order/:orderId - Deletar pedido');
    const deleteResponse = await makeRequest('DELETE', '/order/v10089015vdb');
    console.log('✅ Status:', deleteResponse.status);
    console.log('✅ Response:', JSON.stringify(deleteResponse.data, null, 2));

    console.log('\n✨ Testes concluídos!\n');
  } catch (error) {
    console.error('❌ Erro durante testes:', error.message);
  }
}

testAPI();
