import React, { useEffect, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  DraftEditorCommand,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./index.css";

interface Props {
  name: string;
  text: Function;
  index: Number;
  sendFile: Function;
}
interface imageProp {
  image: {
    lastModified: string;
    lastModifiedDate: object;
    name: string;
    size: BigInteger;
    type: string;
    webkitRelativePath: string;
  };
  src: string | undefined;
}
const TextEditor = ({ name, text, index, sendFile }: Props) => {
  const initialState = EditorState.createEmpty();
  const [editorState, setEditorState] =
    React.useState<EditorState>(initialState);
  const [images, setImages] = useState<imageProp[]>([]);
  const [image, setImage] = useState<imageProp>();
  const handleSave = () => {
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  };

  useEffect(() => {
    image && setImages([image, ...images]);
    image && sendFile(name, image.image);
  }, [image]);

  const handleInsertImage = () => {
    const src = prompt("Please enter the URL of your picture");
    if (!src) {
      return;
    }
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  const handleAddLink = () => {
    const selection = editorState.getSelection();
    const link = prompt("Please enter the URL of your link");
    if (!link) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
      return;
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "apply-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const fileUpload = (e: any) => {
    const files = e.target.files;
    Array.from(files).forEach((_file: any) => {
      const fr = new FileReader();
      fr.readAsDataURL(_file);
      fr.onload = (e) => {
        new File([_file], `${name}-${_file.name}`, {
          type: _file.type,
          lastModified: _file.lastModified,
        });
        setImage({ image: _file, src: e.target?.result?.toString() });
      };
    });
  };

  return (
    <div className="section">
      <fieldset className="section">
        <legend>{name}</legend>
        <div className="btn-container">
          {/* <button onMouseDown={(e) => handleBlockClick(e, "header-one")}>H1</button>
      <button onMouseDown={(e) => handleBlockClick(e, "header-two")}>H2</button>
      <button onMouseDown={(e) => handleBlockClick(e, "header-three")}>
        H3
      </button>
      <button onMouseDown={(e) => handleBlockClick(e, "unstyled")}>
        Normal
      </button>
      <button onMouseDown={(e) => handleTogggleClick(e, "BOLD")}>bold</button>
      <button onMouseDown={(e) => handleTogggleClick(e, "UNDERLINE")}>
        underline
      </button>
      <button onMouseDown={(e) => handleTogggleClick(e, "ITALIC")}>
        italic
      </button>
      <button onMouseDown={(e) => handleTogggleClick(e, "STRIKETHROUGH")}>
        strikthrough
      </button>
      <button onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}>
        Ordered List
      </button>
      <button onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}>
        Unordered List
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          handleInsertImage();
        }}
      >
        image
      </button>
      <button
        disabled={editorState.getSelection().isCollapsed()}
        onMouseDown={(e) => {
          e.preventDefault();
          handleAddLink();
        }}
      >
        link
      </button>
  */}
          <button onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}>
            Point Wise
          </button>
        </div>
        <Editor
          editorState={editorState}
          onChange={(e) => {
            setEditorState(e);
            text(
              index,
              name,
              JSON.stringify(convertToRaw(e.getCurrentContent()))
            );
          }}
          handleKeyCommand={handleKeyCommand}
        />
      </fieldset>
      <div className="image-container">
        {images.map((_Image) => (
          <img src={_Image.src} />
        ))}
      </div>
      <input
        type={"file"}
        accept="image/*"
        multiple
        onChange={fileUpload}
        className="btn-upload"
      />
    </div>
  );
};

export default TextEditor;
