import React from 'react';
import axios from 'axios';
import { Card, Table, Divider, Button, Modal, Form, Input, Radio, Popconfirm, message  } from 'antd';

const dealUrl = "http://localhost:8080/backend/rest/deal/";

const MODE = {
  INSERT: "insert",
  UPDATE: "update",
  DELETE: "delete"
};

const DealForm = Form.create({ name: 'deal_insert_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form
      } = this.props;
      const { getFieldDecorator } = form;
      let deal = this.props.deal || {}
      return (
        <Modal
          visible={visible}
          title="Insert a new Deal"
          okText="Insert"
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
            <Form.Item label="Publish Date">
              {getFieldDecorator('publish_date', { initialValue: deal.publish_date ? deal.publish_date.substring(0, 10) : '' })(<Input type="date" />)}
            </Form.Item>
            <Form.Item label="End Date">
              {getFieldDecorator('end_date', { initialValue: deal.end_date ? deal.end_date.substring(0, 10) : '' })(<Input type="date" />)}
            </Form.Item>
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

export default class Deal extends React.Component {
  state = {
    deals: [],
    deal: {},
    visible: false,
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

  componentDidMount() {
    this.getDeals();
  }
  
  showModal = (deal = {}, mode = MODE.INSERT) => {
    this.setState({
      deal,
      visible: true,
      mode
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    let { deal, mode } = this.state;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();

      deal = {...deal, ...values};
      switch(mode){
        case MODE.UPDATE:
          this.updateDeal(deal);
          break;
        case MODE.INSERT:
          this.insertDeal(deal);
          break;
      }

      this.setState({ 
        visible: false
      });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'tite',
        width: '30%'
      }, {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        width: '45%'
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
            <a href="#" onClick={() => this.showModal(deal, MODE.UPDATE)} style={{ marginRight: 8 }}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure delete this deal?" onConfirm={() => this.deleteDeal(deal.id)} okText="Yes" cancelText="No">
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        ),
        width: '10%'
      }];
    return (
      <div>
        <DealForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          deal={this.state.deal}
        />
        <Card
          title="Deals"
          extra={<Button icon="plus" type="primary" onClick={() => this.showModal()}>Insert</Button>}>
          <Table rowKey={'id'} columns={columns} dataSource={this.state.deals || []} />
        </Card>
      </div> 
    )
  }
}