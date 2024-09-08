import { Pagination, Table } from "antd";
import { Excel } from "antd-table-saveas-excel";
import { useRef, useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { WrapperPagination } from "./styles";

const TableComponent = (props) => {
  const [isSelectedRowKeys, setIsSelectedRowKeys] = useState([]);

  const {
    pageValue,
    totalPagination,
    selectionType = "checkbox",
    isLoading = false,
    columns = [],
    data: dataSource = [],
    handleDelete,
    handleOnChangePage,
  } = props;

  const newColumns = () => {
    return columns?.filter(
      (col) => col.dataIndex !== "action" && col.dataIndex !== "image"
    );
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIsSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleDeleteMany = () => {
    handleDelete(isSelectedRowKeys);
    setIsSelectedRowKeys([]);
  };

  const tableRef = useRef(null);

  const handleExportFile = () => {
    const excel = new Excel();
    excel
      .addSheet("table")
      .addColumns(newColumns())
      .addDataSource(dataSource, {
        str2Percent: true,
      })
      .saveAs("Data Table.xlsx");
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <div style={{ display: "flex", gap: "20px" }}>
        {isSelectedRowKeys.length > 0 && (
          <ButtonComponent
            buttonText="Xóa tất cả"
            styleButton={{
              backgroundColor: "#fff",
              marginBottom: "20px",
              color: "#007fff",
              border: "1px solid #007fff",
              fontWeight: 600,
            }}
            size="large"
            className="wrapper-button"
            onClick={handleDeleteMany}
          />
        )}

        <ButtonComponent
          onClick={handleExportFile}
          buttonText="Export Excel"
          size="large"
          styleButton={{
            backgroundColor: "#fff",
            marginBottom: "20px",
            color: "#007fff",
            border: "1px solid #007fff",
            fontWeight: 600,
          }}
        />
      </div>

      <Table
        ref={tableRef}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ["none", "none"],
        }}
        {...props}
      />
      <WrapperPagination>
        <Pagination
          defaultCurrent={pageValue}
          total={totalPagination}
          pageSize={10}
          onChange={handleOnChangePage}
        />
      </WrapperPagination>
    </LoadingComponent>
  );
};

export default TableComponent;
