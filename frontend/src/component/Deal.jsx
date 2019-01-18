import React from 'react';
import axios from 'axios';
import { Card, Table, Divider, Button, Popconfirm, message, Modal, Form, Input, Radio, InputNumber, Row, Col } from 'antd';
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
            <Form.Item label="Text">
              {getFieldDecorator('text', { initialValue: buyOption.text })(<Input type="textarea" />)}
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

export default class Deal extends React.Component {
  state = {
    deals: [],
    deal: {},
    buyOptions: [],
    buyOption: {},
    dealModalVisible: false,
    buyOptionModalVisible: false,
    mode: MODE.INSERT
  }

  getDeals(){
    axios.get(dealUrl)
      .then(res => {
        this.setState({ 
          deals: res.data.deal 
        });
      })
  }

  async listBuyOptionsByDealId(dealId){
    let buyOptions = [];
    await axios.get(`${buyOptionUrl}list_by_deal?id=${dealId}`)
      .then(res => buyOptions = res.data ? res.data.buy_option : []);
    return buyOptions;
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
      })
  }

  updateBuyOption(buyOption){
    axios.put(buyOptionUrl, buyOption)
      .then(() => {
        message.success('Buy Option updated!');
      })
  }

  deleteBuyOption(id){
    axios.delete(`${buyOptionUrl}${id}`)
      .then(() => {
        message.success('Buy Option deleted!');
      })
  }

  componentDidMount() {
    this.getDeals();
  }

  hideModals(){
    this.setState({
      dealModalVisible: false,
      buyOptionModalVisible: false
    });
  }
  
  showModalDeal = (params) => {
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

  saveDealFormRef = (formRef) => {
    this.dealFormRef = formRef;
  }

  saveBuyOptionFormRef = (formRef) => {
    this.buyOptionFormRef = formRef;
  }

  render() {
    const buyOptionColumns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'tite',
        width: '30%'
      },{
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        width: '30%'
      }
    ];
    
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
            <a href="#" onClick={() => this.showModalDeal(deal, MODE.UPDATE)} style={{ marginRight: 8 }}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure delete this deal?" onConfirm={() => this.deleteDeal(deal.id)} okText="Yes" cancelText="No">
              <a href="#">Delete</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Button icon="plus" type="primary" onClick={() => this.showModalBuyOption({dealId: deal.id})} style={{marginLeft: 10}}>Buy Options</Button>
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
        <Card
          title="Deals"
          extra={<Button icon="plus" type="primary" onClick={() => this.showModalDeal()}>Deal</Button>}>
          <Table 
            rowKey={'id'} 
            columns={dealColumns} 
            dataSource={this.state.deals || []} 
          />
        </Card>
      </div> 
    )
  }
}