import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/index";
import { Col, Row, Form } from "antd";
import {
  ButtonComponent,
  InputComponent,
} from "@/components/form";
import { eventEmitter } from "@/utils/index";
import { useForm } from "react-hook-form";
import {
  schema,
  FormData,
  handleSubmitEdit,
  handleSubmitCreate,
} from "./constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState, useAppSelector } from "@/store/index";
import UploadComponent from "@/components/form/uploadComponent";
import lodash from "lodash";
import { handleMultiPrevImageS3 } from "@/components/modal/modalChangeInfoUser/content/constant";
import MarkdownProduct from "../markdown";
import markDownApi from "@/api/markdown";

interface Props {
  isEdit: boolean;
}

const FormNews = ({ isEdit }: Props) => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const newsSelected = useAppSelector(
    (state: RootState) => state.manageNews.newsSelected
  );

  const [imageDefault, setImageDefault] = useState([]);
  const [markdown, setMarkDown] = useState({ html: "", text: "" });
  const [showMarkDown, setShowMarkdown] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    // use resolver to validate with yup
    resolver: yupResolver(schema),
    defaultValues: {
      id: newsSelected?.id,
      name: newsSelected?.name,
      image: newsSelected?.image && JSON.parse(newsSelected?.image),
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const dataValue = lodash.cloneDeep(data);
      const { image } = dataValue;

      const imagesUpload = !lodash.isEmpty(image)
        ? await handleMultiPrevImageS3(image)
        : "";
      dataValue.image =
        typeof imagesUpload === "string"
          ? imagesUpload
          : JSON.stringify(imagesUpload);

      const { metadata } = await markDownApi.createMarkdown({
        contentHTML: markdown.html,
        contentMarkdown: markdown.text,
        id:
          isEdit && newsSelected?.markdown_id
            ? newsSelected?.markdown_id
            : null,
      });

      const { id } = metadata;
      dataValue.markdown_id = id;
      dataValue.contentHTML = markdown.html;
      dataValue.contentMarkdown = markdown.text;

      isEdit
        ? handleSubmitEdit(dataValue, dispatch, eventEmitter)
        : handleSubmitCreate(dataValue, dispatch, eventEmitter);
    } catch (error: unknown) {
      console.log("error", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = ({ html, text }) => {
    setMarkDown({ html, text });
  };

  const debounceEditor = lodash.debounce(handleEditorChange, 300);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleClose = () => {
    eventEmitter.emit("cancel_modal");
  };

  useEffect(() => {
    const imageShow = newsSelected?.image
      ? JSON.parse(newsSelected?.image)
      : [];
    setImageDefault(imageShow);

    handleEditorChange({
      html: newsSelected?.contentHTML || "",
      text: newsSelected?.contentMarkdown || "",
    });

    setShowMarkdown(true);
  }, [newsSelected]);

  return (
    <div className="change__field-product">
      <Form
        name="change__field-product"
        onFinish={handleSubmit(onSubmit)}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[16, 16]}>
          <Col md={6} span={24}>
            News Name <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <InputComponent
              name="name"
              control={control}
              errors={errors}
              placeholder="Name product"
              className="remove__border"
            />
          </Col>
          <Col md={6} span={24}>
            News Image <span className="required">*</span>
          </Col>
          <Col md={18} span={24}>
            <UploadComponent
              name="image"
              control={control}
              errors={errors}
              className="remove__border"
              setValue={setValue}
              maxCount={1}
              defaultValue={imageDefault}
            />
          </Col>
          <Col md={24} span={24}>
            Markdown <span className="required">*</span>
          </Col>
          <Col md={24} span={24}>
            <MarkdownProduct
              showMarkDown={showMarkDown}
              handleEditorChange={debounceEditor}
              markdown={markdown}
            />
          </Col>
        </Row>
        <div className="button__footer">
          <ButtonComponent
            label="Cancel"
            className="btn__tab"
            loading={loading}
            type="default"
            onClick={handleClose}
          />
          <ButtonComponent
            htmlType="submit"
            label="Save changes ok"
            className="btn__submit btn__tab"
            loading={loading}
          />
        </div>
      </Form>
    </div>
  );
};

export default FormNews;
