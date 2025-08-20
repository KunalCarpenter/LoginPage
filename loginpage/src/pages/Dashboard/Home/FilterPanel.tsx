import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";

interface FilterPanelProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  searchText: string;
  onSearchChange: (searchText: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  searchText,
  onSearchChange,
}) => {
  // 
  //
  return (
    <Box sx={{ p: 2, borderRight: "1px solid #ddd", height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Search Products..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ mt: 1, mb: 2 }}
      />
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontSize: 20 }}>
        Category
      </Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={() => onCategoryChange(category)}
                name={category}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default FilterPanel;
