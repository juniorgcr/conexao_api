import express from 'express';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Armazenamento em memória para pedidos
let ordersMemory = {};

// ============ FUNÇÕES AUXILIARES ============

// Transformar dados de entrada para o formato do banco
function transformOrderData(body) {
  const orderId = body.numeroPedido.split('-')[0]; // Extrai "v10089015vdb" de "v10089015vdb-01"
  
  return {
    orderId,
    value: body.valorTotal,
    creationDate: new Date(body.dataCriacao),
    items: body.items.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
}

// ============ ENDPOINTS ============

// GET: Listar todos os pedidos (DEVE VIR ANTES DO GET /:orderId)
app.get('/order/list', (req, res) => {
  try {
    const orders = Object.values(ordersMemory);
    
    res.status(200).json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch (error) {
    console.error('Erro ao listar pedidos:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST: Criar um novo pedido
app.post('/order', (req, res) => {
  try {
    const transformedOrder = transformOrderData(req.body);
    
    if (ordersMemory[transformedOrder.orderId]) {
      return res.status(400).json({ 
        success: false,
        error: 'Pedido já existe' 
      });
    }
    
    ordersMemory[transformedOrder.orderId] = transformedOrder;
    
    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      order: transformedOrder,
    });
  } catch (error) {
    console.error('Erro ao criar pedido:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET: Obter um pedido por ID
app.get('/order/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = ordersMemory[orderId];
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado',
      });
    }
    
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Erro ao obter pedido:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT: Atualizar um pedido
app.put('/order/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const updateData = transformOrderData(req.body);
    
    if (!ordersMemory[orderId]) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado',
      });
    }
    
    ordersMemory[orderId] = { ...ordersMemory[orderId], ...updateData };
    
    res.status(200).json({
      success: true,
      message: 'Pedido atualizado com sucesso',
      order: ordersMemory[orderId],
    });
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE: Deletar um pedido
app.delete('/order/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = ordersMemory[orderId];
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Pedido não encontrado',
      });
    }
    
    delete ordersMemory[orderId];
    
    res.status(200).json({
      success: true,
      message: 'Pedido deletado com sucesso',
      deletedOrder: order,
    });
  } catch (error) {
    console.error('Erro ao deletar pedido:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Iniciar servidor
app.listen(port, () => 
  console.log(`\n🚀 Server está rodando em http://localhost:${port}\n`));