import React from 'react';
import axios from 'axios';
import { Card, Table, Divider, Button, Popconfirm, message, Modal, Form, Input, Radio, InputNumber, Row, Col} from 'antd';
import { MODE, dealUrl, buyOptionUrl } from './constants';

const DealForm = Form.create({ name: 'deal_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form, mode
      } = this.props;
      const { getFieldDecorator } = form;
      let deal = this.props.deal || {}
      let modeText = (mode === MODE.INSERT ? "Insert" : "Update");
      return (
        <Modal
          visible={visible}
          title={modeText + " Deal" }
          okText={modeText}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                initialValue: deal.title,
                rules: [{ required: true, message: 'Please input the title of the deal!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="Text">
              {getFieldDecorator('text', { initialValue: deal.text })(<Input type="textarea" />)}
            </Form.Item>
            <Row>
              <Col span={10}>
                <Form.Item label="Publish Date">
                  {getFieldDecorator('publish_date', { initialValue: deal.publish_date ? deal.publish_date.substring(0, 10) : '' })(<Input type="date" />)}
                </Form.Item>
              </Col>
              <Col span={10} style={{marginLeft: 10}}>
                <Form.Item label="End Date">
                  {getFieldDecorator('end_date', { initialValue: deal.end_date ? deal.end_date.substring(0, 10) : '' })(<Input type="date" />)}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="URL">
              {getFieldDecorator('url', { initialValue: deal.url })(<Input type="text" />)}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator('deal_type_id', { initialValue: deal.deal_type_id || '1' })(
                <Radio.Group>
                  <Radio value="1">Local</Radio>
                  <Radio value="2">Product</Radio>
                  <Radio value="3">Trip</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

const BuyOptionForm = Form.create({ name: 'buy_option_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form, mode
      } = this.props;
      const { getFieldDecorator } = form;
      let buyOption = this.props.buyOption || {}
      let modeText = (mode === MODE.INSERT ? "Insert" : "Update");

      return (
        <Modal
          visible={visible}
          title={modeText + " Buy Option" }
          okText={modeText}
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator('title', {
                initialValue: buyOption.title,
                rules: [{ required: true, message: 'Please input the title of the buy option!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Row>
              <Col span={8}>
                <Form.Item label="Normal Price">
                {getFieldDecorator('normal_price', { initialValue: buyOption.normal_price })(<InputNumber />)}
              </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Sale Price">
                  {getFieldDecorator('sale_price', { initialValue: buyOption.sale_price })(<InputNumber />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Discount (%)">
                  {getFieldDecorator('percentage_discount', { initialValue: buyOption.percentage_discount })(<InputNumber />)}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Quantity Cupom">
              {getFieldDecorator('quantity_cupom', { initialValue: buyOption.quantity_cupom })(<InputNumber />)}
            </Form.Item>
            <Row>
              <Col span={10} >
                <Form.Item label="Start Date">
                  {getFieldDecorator('start_date', { initialValue: buyOption.start_date ? buyOption.start_date.substring(0, 10) : '' })(<Input type="date" />)}
                </Form.Item>
              </Col>
              <Col span={10} style={{marginLeft:10}}>
                <Form.Item label="End Date">
                  {getFieldDecorator('end_date', { initialValue: buyOption.end_date ? buyOption.end_date.substring(0, 10) : '' })(<Input type="date" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  }
);

const SellUnitForm = Form.create({ name: 'sell_unit_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onOK, form
      } = this.props;
      const { getFieldDecorator } = form;
      let buyOption = this.props.buyOption || {}
      
      return (
        <Modal
          visible={visible}
          title={"Sell Unit of " + buyOption.title}
          okText="Sell"
          onCancel={onCancel}
          onOk={onOK}
        >
          <Form layout="vertical">
            <Form.Item label={"Quantity (max: "+buyOption.quantity_cupom+")"}>
              {getFieldDecorator('quantity', { 
                initialValue: 0,
                rules: [{ required: true, message: 'Please select a quantity!' }]
              })(<InputNumber/>)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default class Deal extends React.Component {
  state = {
    deals: [],
    deal: {},
    buyOptions: [],
    buyOption: {},
    dealModalVisible: false,
    buyOptionModalVisible: false,
    sellUnitModalVisible: false,
    mode: MODE.INSERT
  }

  async listBuyOptionById(deal){
    let buyOptions = [];
    await axios.get(`${buyOptionUrl}list_by_deal?id=${deal.id}`)
      .then(res => buyOptions = res.data ? Array.isArray(res.data.buy_option) ? res.data.buy_option : [res.data.buy_option] : [])
    return buyOptions;
  }

  async updateListBuyOption(dealId){
    const { deals = [] } = this.state;
    let deal = deals.find(d => dealId === d.id);
    if(deal){
      deal.buy_option = await this.listBuyOptionById(deal);
      this.setState({ deals })
    }
  }

  async getDeals(){
    axios.get(dealUrl)
      .then(async res => {
        let deals = res.data ? Array.isArray(res.data.deal) ? res.data.deal : [res.data.deal] : [] 
        await deals.map(async deal => deal.buy_option = await this.listBuyOptionById(deal));
        this.setState({ deals })
      })
  }

  insertDeal(deal){
    axios.post(dealUrl, deal)
      .then(res => {
        message.success('Deal inserted!');
        this.getDeals();
      })
  }

  updateDeal(deal){
    axios.put(dealUrl, deal)
      .then(res => {
        message.success('Deal updated!');
        this.getDeals();
      })
  }

  deleteDeal(id){
    axios.delete(`${dealUrl}${id}`)
      .then(res => {
        message.success('Deal deleted!');
        this.getDeals();
      })
  }

  insertBuyOption(buyOption){
    axios.post(buyOptionUrl, buyOption)
      .then(() => {
        message.success('Buy Option inserted!');
        this.updateListBuyOption(buyOption.deal_id);
        
      })
  }

  updateBuyOption(buyOption){
    axios.put(buyOptionUrl, buyOption)
      .then(() => {
        message.success('Buy Option updated!');
        this.updateListBuyOption(buyOption.deal_id);
      })
  }

  deleteBuyOption(id, dealId){
    axios.delete(`${buyOptionUrl}${id}`)
      .then(() => {
        message.success('Buy Option deleted!');
        this.updateListBuyOption(dealId);
      })
  }

  sellUnit(buyOption, quantity){
    let { deals = [] } = this.state;
    let deal = deals.find(d => buyOption.deal_id === d.id);

    buyOption.quantity_cupom -= Number(quantity);
    axios.put(buyOptionUrl, buyOption)
      .then(() => {
        deal.total_sold = Number(deal.total_sold) + Number(quantity) + "";
        axios.put(dealUrl, deal)
          .then(() => {
            message.success(quantity + ' option' + (quantity > 1 ? '(s)' : '')  + ' sold!');
            this.updateListBuyOption(deal.id);
          })
      })
  }

  componentDidMount() {
    this.getDeals();
  }

  hideModals(){
    this.setState({
      dealModalVisible: false,
      buyOptionModalVisible: false,
      sellUnitModalVisible: false
    });
  }
  
  showModalDeal = (params = {}) => {
    this.setState({
      deal: params.deal || {},
      dealModalVisible: true,
      mode: params.mode || MODE.INSERT
    });
  }

  showModalBuyOption = (params) => {
    this.setState({
      buyOption: params.buyOption || {}, 
      buyOptionModalVisible: true,
      mode: params.mode || MODE.INSERT,
      deal: {id: params.dealId || null}
    });
  }

  showModalSellUnit = (buyOption) => {
    this.setState({
      buyOption: buyOption || {}, 
      sellUnitModalVisible: true
    });
  }

  handleCancel = () => {
    this.hideModals();
  }

  handleUpsertDeal = () => {
    const form = this.dealFormRef.props.form;
    let { deal, mode } = this.state;
    form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }
      form.resetFields();

      deal = {...deal, ...values};
      switch(mode){
        case MODE.UPDATE:
          this.updateDeal(deal);
          break;
        case MODE.INSERT:
        default:
          this.insertDeal(deal);
          break;
      }

      this.hideModals();
    });
  }

  handleUpsertBuyOption = () => {
    const form = this.buyOptionFormRef.props.form;
    let { deal, buyOption, mode } = this.state;
    form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }
      form.resetFields();

      buyOption = {...buyOption, deal_id: deal.id, ...values};
      switch(mode){
        case MODE.UPDATE:
          this.updateBuyOption(buyOption);
          break;
        case MODE.INSERT:
        default:
          this.insertBuyOption(buyOption);
          break;
      }

      this.hideModals();
    });
  }

  handleSellUnit = () => {
    const form = this.sellUnitFormRef.props.form;
    let { buyOption } = this.state;
    form.validateFields((err, values) => {
      let valueMoreMax = Number(buyOption.quantity_cupom) < values.quantity;
      let valueLessMin = values.quantity < 0;
      if (err || valueMoreMax || valueLessMin) {
        if(valueMoreMax) message.error("Value must be less than " + Number(buyOption.quantity_cupom) + "!");
        if(valueLessMin) message.error("Value must be greater than 0!");
        return;
      }
      form.resetFields();
      this.sellUnit(buyOption, values.quantity);
      this.hideModals();
    });
  }

  saveDealFormRef = (formRef) => {
    this.dealFormRef = formRef;
  }

  saveBuyOptionFormRef = (formRef) => {
    this.buyOptionFormRef = formRef;
  }

  saveSellUnitFormRef = (formRef) => {
    this.sellUnitFormRef = formRef;
  }

  render() {
    const dealColumns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'tite'
      }, {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        width: '30%'
      },{
        title: 'Total Sold',
        key: 'total_sold',
        dataIndex: 'total_sold',
        width: '10%'
      },{
        title: 'URL',
        key: 'url',
        dataIndex: 'url',
        render: url => (
          <a href={url}>Access</a>
        ),
        width: '5%'
      },{
        title: 'Action',
        key: 'action',
        render: deal => (
          <span>
            <Button type="primary" shape="circle" icon="edit" onClick={() => this.showModalDeal({deal, mode: MODE.UPDATE})}/>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure delete this deal?" onConfirm={() => this.deleteDeal(deal.id)} okText="Yes" cancelText="No">
              <Button type="primary" shape="circle" icon="delete"/>
            </Popconfirm>
          </span>
        ),
        width: '15%'
      }
    ];

    const buyOptionColumns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'tite',
        width: '30%'
      },{
        title: 'Normal Price',
        dataIndex: 'normal_price',
        key: 'normal_price',
      },{
        title: 'Sale Price',
        dataIndex: 'sale_price',
        key: 'sale_price',
      },{
        title: 'Discount (%)',
        dataIndex: 'percentage_discount',
        key: 'percentage_discount',
      },{
        title: 'Quantiy Cupom',
        dataIndex: 'quantity_cupom',
        key: 'quantity_cupom',
      },{
        title: 'Action',
        key: 'action',
        render: buyOption => (
          <span>
            <Button type="primary" shape="circle" icon="shopping-cart" onClick={() => this.showModalSellUnit(buyOption)}/>
            <Divider type="vertical" />
            <Button type="primary" shape="circle" icon="edit" onClick={() => this.showModalBuyOption({buyOption, mode: MODE.UPDATE, dealId: buyOption.deal_id})}/>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure delete this buy option?" onConfirm={() => this.deleteBuyOption(buyOption.id, buyOption.deal_id)} okText="Yes" cancelText="No">
              <Button type="primary" shape="circle" icon="delete"/>
            </Popconfirm>
          </span>
        ),
        width: '15%'
      }
    ];

    return (
      <div>
        <DealForm
          wrappedComponentRef={this.saveDealFormRef}
          visible={this.state.dealModalVisible}
          onCancel={this.handleCancel}
          onCreate={this.handleUpsertDeal}
          deal={this.state.deal}
          mode={this.state.mode}
        />
        <BuyOptionForm
          wrappedComponentRef={this.saveBuyOptionFormRef}
          visible={this.state.buyOptionModalVisible}
          onCancel={this.handleCancel}
          onCreate={this.handleUpsertBuyOption}
          buyOption={this.state.buyOption}
          mode={this.state.mode}
        />
        <SellUnitForm
          wrappedComponentRef={this.saveSellUnitFormRef}
          visible={this.state.sellUnitModalVisible}
          onCancel={this.handleCancel}
          onOK={this.handleSellUnit}
          buyOption={this.state.buyOption}
        />
        <Card
          title="Deals"
          extra={<Button icon="plus" type="primary" onClick={() => this.showModalDeal()}>Deal</Button>}>
          <Table 
            rowKey={'id'} 
            columns={dealColumns} 
            dataSource={this.state.deals || []}
            expandedRowRender={deal => 
              <Card
                title="Buy Options"
                extra={<Button icon="plus" type="primary" onClick={() => this.showModalBuyOption({dealId: deal.id})} style={{marginLeft: 10}}>Buy Option</Button>}>
                <Table 
                  rowKey={'id'} 
                  columns={buyOptionColumns} 
                  dataSource={deal.buy_option || []}
                />
              </Card>
            }
          />
        </Card>
      </div> 
    )
  }
}