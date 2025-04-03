import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MenuModal = ({ isOpen, onClose, onSave }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    itemImage: "",
    itemName: "",
    itemPrice: "",
    itemDescription: "",
    itemRating: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  // Add new menu item
  const handleAddItem = () => {
    if (!newItem.itemName || !newItem.itemPrice) {
      alert("Item name and price are required!");
      return;
    }

    setMenuItems((prev) => [...prev, newItem]);
    setNewItem({
      itemImage: "",
      itemName: "",
      itemPrice: "",
      itemDescription: "",
      itemRating: "",
    });
  };

  // Save menu and close modal
  const handleSaveMenu = () => {
    onSave(menuItems);
    onClose(); // Close modal after saving
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Menu Items</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            name="itemImage"
            placeholder="Image URL"
            value={newItem.itemImage}
            onChange={handleChange}
          />
          <Input
            name="itemName"
            placeholder="Item Name"
            value={newItem.itemName}
            onChange={handleChange}
            required
          />
          <Input
            name="itemPrice"
            placeholder="Price (₹)"
            type="number"
            value={newItem.itemPrice}
            onChange={handleChange}
            required
          />
          <Textarea
            name="itemDescription"
            placeholder="Description"
            value={newItem.itemDescription}
            onChange={handleChange}
          />
          <Input
            name="itemRating"
            placeholder="Rating (1-5)"
            type="number"
            value={newItem.itemRating}
            onChange={handleChange}
          />

          <Button onClick={handleAddItem}>Add Item</Button>
        </div>

        {/* Display added items */}
        {menuItems.length > 0 && (
          <div className="mt-4 space-y-2 overflow-y-auto h-50">
            <h3 className="text-lg font-semibold">Menu Preview</h3>
            {menuItems.map((item, index) => (
              <div key={index} className="border p-2 rounded">
                <p>
                  <strong>Name:</strong> {item.itemName}
                </p>
                <p>
                  <strong>Price:</strong> ₹{item.itemPrice}
                </p>
                {item.itemDescription && (
                  <p>
                    <strong>Description:</strong> {item.itemDescription}
                  </p>
                )}
                {item.itemImage && (
                  <img
                    src={item.itemImage}
                    alt="Item"
                    className="h-16 w-16 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <Button onClick={handleSaveMenu} className="mt-4">
          Save Menu
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MenuModal;