import request from 'supertest';
import {router} from '../src/gatewayServer';

describe('createGateway', () => {
  it('should create a new gateway', async () => {
    const res = await request(router)
      .post('/gateways/create')
      .send({
        serialNumber: '123456',
        name: 'Test Gateway',
        ipv4Address: '192.168.1.1',
        peripheralDevices: [],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.gateway.serialNumber).toEqual('123456');
    expect(res.body.gateway.name).toEqual('Test Gateway');
    expect(res.body.gateway.ipv4Address).toEqual('192.168.1.1');
    expect(res.body.gateway.peripheralDevices).toEqual([]);
  });
});

describe('getGateways',()=>{
  it('should read all gateways', async()=>{
    const res = await request(router)
      .get('/gateways/get');
     
    expect(res.statusCode).toEqual(200);
  })
})