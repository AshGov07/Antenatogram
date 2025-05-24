/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from 'react';
import { Modal, Button, Table, TextInput } from "flowbite-react";
import useFormatDate from "../../hooks/useFormatDate";
import MyResponsiveLine from "../line_graph";

const GraphModal = ({ openModal, setOpenModal, selectedParameter, onSave }) => {
  const [editableData, setEditableData] = useState([]);
  const formatDate = useFormatDate;
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (selectedParameter && selectedParameter.data) {
      setEditableData(selectedParameter.data);
    }
  }, [selectedParameter]);

  const handleInputChange = useCallback((index, field, value) => {
    setEditableData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  }, []);

  const handleAddNewEntry = useCallback(() => {
    setEditableData(prevData => [...prevData, { date: today, value: "0" }]);
  }, [today]);

  const saveChanges = useCallback(() => {
    if (editableData.some((entry) => !entry.date || entry.value === "")) {
      alert("Please ensure all fields are filled correctly.");
      return;
    }
    onSave(editableData);
  }, [editableData, onSave]);

  const handleDeleteEntry = useCallback((index) => {
    setEditableData(prevData => prevData.filter((entry, i) => i !== index));
  }, []);

  return (
    <Modal show={openModal} size="7xl" onClose={() => setOpenModal(false)} className="overflow-hidden">
      <Modal.Header>{selectedParameter?.id}</Modal.Header>

      <Modal.Body className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div>
          <h3 className="text-md font-semibold mb-4">Graph</h3>
          <MyResponsiveLine
            data={editableData.map((d) => parseFloat(d.value))}
            labels={editableData.map((d) => formatDate(d.date))}
            threshold={selectedParameter?.threshold}
            view={'modal'}
          />
        </div>

        <div className="h-full overflow-y-auto">
          
          <div className="h-full">
            <Table>
              <Table.Head>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Value</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              <Table.Body className="overflow-y-auto h-96">
                {editableData.map((entry, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <TextInput
                        value={entry.date}
                        onChange={(e) =>
                          handleInputChange(index, "date", e.target.value)
                        }
                        type="date"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <TextInput
                        value={entry.value}
                        onChange={(e) =>
                          handleInputChange(index, "value", e.target.value)
                        }
                        type="number"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Button 
                        color="red"
                        onClick={() => handleDeleteEntry(index)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
        <Button
            color="green"
            onClick={handleAddNewEntry}
            className="mb-4"
          >
            Add New Entry
          </Button>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={saveChanges}>Save Changes</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GraphModal;
