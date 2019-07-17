<template>
  <div class="employee">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.keyword" placeholder="请输入姓名/邮箱"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="formInline.deptId">
          <el-option label="全部" value="-1"></el-option>
          <el-option :label="item.name" :value="item.id" v-for="item in departmentArr" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="el-icon-search">查询</el-button>
        <el-button type="success" class="el-icon-plus" @click="$router.push('/employee/add')">添加</el-button>
        <el-button type="danger" class="el-icon-delete">批量删除</el-button>
        <el-button type="warning" class="el-icon-sort">导出</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="编号" width="120">
      
      </el-table-column>
      <el-table-column prop="name" label="名称" width="120"></el-table-column>
      <el-table-column prop="email" label="email" show-overflow-tooltip></el-table-column>
      <el-table-column prop="age" label="年龄" show-overflow-tooltip></el-table-column>
      <el-table-column prop="dept.name" label="部门" show-overflow-tooltip></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            class="el-icon-edit"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            class="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="prev, pager, next,total "
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { employeeApi, departmentApi } from '../../request/api';

export default {
  data() {
    return {
      formInline: {
        user: "",
        deptId:"-1"
      },
      keywords: "", // 关键字
      tableData: [],
      currentPage: 1,
      total: 0,
      departmentArr:[]
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    onSubmit() {
      console.log("submit!");
    },
    handleEdit() {},
    handleDelete() {},

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.getEmployeeList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
        this.getEmployeeList();
    },

    getEmployeeList(){
          employeeApi({
          currentPage:this.currentPage,
          pageSize:10,
          keyword:this.formInline.keyword,
          deptId:this.formInline.deptId,
          token:localStorage.getItem('token')

      }).then(res=>{
          if(res.success==true){
              this.tableData=res.data.list;
              console.log(this.tableData) 
          }
      })

    }
  },

  created(){
      this.getEmployeeList();
      departmentApi({
          currentPage:1,
          pageSize:1000,
          token:localStorage.getItem('token')

      }).then(res=>{
          if(res.success==true){
              this.departmentArr=res.data.list
          }
      })

  }
};
</script>

<style lang="less" scoped>
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
