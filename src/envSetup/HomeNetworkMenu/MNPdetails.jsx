import React, { Component } from 'react'
import MNPService from "../../service/MNPService";
import history from "../../History";
import '../../styling/Styletable.css';
import {Table ,Button, Form,Popconfirm,Input,Space} from "antd"
import {  EditFilled , PlusCircleFilled,  DeleteFilled,SearchOutlined } from '@ant-design/icons';

class MNPdetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
        mnp: [],
            message: null
        }
        //this.deleteMNP = this.deleteMNP.bind(this);
        this.editMNP = this.editMNP.bind(this);
        this.addMNP = this.addMNP.bind(this);
        this.reloadMNPList = this.reloadMNPList.bind(this);
        this.getColumnSearchProps =this.getColumnSearchProps .bind(this);
    }

    componentDidMount() {
        this.reloadMNPList();
    }

  
        reloadMNPList() {
            MNPService.fetchMNPdetails()
                .then((res) => {
                    this.setState({mnp: res.data.result})
                });
        }
    
    
    deleteMNP(mnp_id) {
        MNPService.deleteMNP(mnp_id)
           .then(res => {
               this.setState({message : 'MNP deleted successfully.'});
               this.setState({mnp: this.state.mnp.filter(mnp => mnp.mnp_id !==mnp_id )});
           })}
    

    editMNP(mnp_id) {
        window.localStorage.setItem("mnp_id", mnp_id);
        //alert(window.localStorage.getItem("mnp_id"));
        history.push('/add-mnp');
        
    }

   addMNP() {
    window.localStorage.removeItem("mnp_id");
        history.push('/add-mnp');
        
    }
    state = { searchText: '',
    searchedColumn: '',
        filteredInfo: null,
        sortedInfo: null,
    };
    
handleChange = (pagination, filters, sorter) => {
console.log('Various parameters', pagination, filters, sorter);
this.setState({
    filteredInfo: filters,
    sortedInfo: sorter,
});
};
getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    // render: text =>
    //   this.state.searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //       searchWords={[this.state.searchText]}
    //       autoEscape
    //       textToHighlight={text.toString()}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

    render(){
        let { sortedInfo,filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo=filteredInfo || {};
        const columns = [
            {
                title: 'Gateway ID',
                dataIndex: 'mnp_id',
                key: 'mnp_id',
                sorter: (a, b) => a.mnp_id- b.mnp_id,
                sortOrder: sortedInfo.columnKey === 'mnp_id' && sortedInfo.order,
                ellipsis: true,
            },
            {
            title: 'Gateway Type',
            dataIndex: 'mnp_type',
            key: 'mnp_type',
            filters: [
                { text: 'Redis', value: 'Redis' },
                { text:  'Enum' ,value:'Enum'},
                { text: 'Cache', value: 'Cache' },
                ],
              filteredValue: filteredInfo.mnp_type || null,
              onFilter: (value, record) => record.mnp_type.includes(value),
            sorter: (a, b) => a.mnp_type.localeCompare(b.mnp_type),
                sortOrder: sortedInfo.columnKey === 'mnp_type' && sortedInfo.order,
                ellipsis: true,
            },
            {
            title: 'Gateway Name',
            dataIndex: 'gateway_name',
            key: 'gateway_name',
            sorter: (a, b) => a.gateway_name.localeCompare(b.gateway_name),
                sortOrder: sortedInfo.columnKey === 'gateway_name' && sortedInfo.order,
                ellipsis: true,
                //...this.getColumnSearchProps('gateway_name'),
            },
            {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            render: (text,record) => <EditFilled onClick={() => this.editMNP(record.mnp_id)} />,
            },
            {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            render: (text,record) =>  <Popconfirm
            title="Are you sure delete this row?"
            onConfirm={this.deleteMNP.bind(this,record.mnp_id)}
            okText="Yes"
            cancelText="No">
            <DeleteFilled/></Popconfirm>
            }
        ];
        return(
            <div>
            <div className='topline'>MNP Gateway Details</div>
              <Form className="formset">
                  <Form.Item>
            
                
               <Button type="primary" onClick={() => this.addMNP()}>Add
                </Button></Form.Item>
                <Form.Item>
               <Table
             columns={columns} 
             dataSource={this.state.mnp} 
             id="students"
             bordered 
             onChange={this.handleChange}  />
             </Form.Item>
             </Form>
          </div>
        );
    }
}

export default MNPdetails;

