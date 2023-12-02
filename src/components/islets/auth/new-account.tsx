import Link from "next/link";
import Input, { InputProps } from "./input";
import AuthButton from "./auth-button";
import clsx from "@/lib/clsx";
import { ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import useNewAccountForm, {
  FormState,
  STEP_COUNT,
} from "@/lib/hooks/useNewAccountForm";
import schema, { schemaFieldsToRender } from "./new-account-form-schema";
import Toaster from "@/components/ui/toaster";
import { ComponentProps, PropsWithChildren } from "react";

const DefaultContainer = ({ children }: PropsWithChildren) => <>{children}</>;
export default function NewAccount() {
  const {
    formData: {
      register,
      handleSubmit,
      formState: { errors },
      control,
      watch,
      setError,
      clearErrors,
    },
    mutation,
    moveToNextStepHandler,
    setFormStep,
    formStep,
    currentKeys,
  } = useNewAccountForm();

  const containerProps = {
    control,
    watch,
    setError,
    errors,
    clearErrors,
  };

  function renderFieldInput(
    fieldKey: keyof FormState,
    props?: InputProps,
    groupKey?: string,
  ) {
    const groupMemberContainer =
      schemaFieldsToRender?.[groupKey!]?.memberFields?.[fieldKey]?.container;
    const fieldContainer = schemaFieldsToRender[fieldKey]?.container;
    const Container =
      groupMemberContainer ?? fieldContainer ?? DefaultContainer;

    const inputProps: ComponentProps<typeof Input> = {
      type: schemaFieldsToRender[fieldKey]?.type ?? "text",
      required: !schema.shape[fieldKey].isOptional(),
      errorMessage: errors?.[fieldKey]?.message,
      labelText: schema.shape[fieldKey].description,
      inputStatus: errors?.[fieldKey]?.message ? "error" : "normal",
      ...register(fieldKey),
      ...props,
    };
    return (
      <Container key={fieldKey} name={fieldKey} {...containerProps}>
        <Input {...inputProps} />
      </Container>
    );
  }
  const submitForm = (data: FormState) => {
    if (formStep + 1 !== STEP_COUNT) {
      setFormStep((v) => v + 1);
    } else {
      mutation.mutate(data);
    }
  };

  return (
    <>
      <Toaster />
      <form
        onSubmit={handleSubmit(submitForm, moveToNextStepHandler)}
        className="overflow-hidden 
        rounded-lg bg-foreground p-8 text-[#B9BBBE] shadow-lg transition-all"
      >
        <Progress
          value={((formStep + 1) / STEP_COUNT) * 100}
          className="mb-2 "
          indicatorClassName="bg-gradient-to-r from-cyan-200 via-sky-500 to-indigo-500"
        />
        <div className="grid gap-2 text-center">
          <h4 className="text-2xl font-normal leading-8 text-white">
            Create an account
          </h4>
          <p className="leading-6">
            Fill fields below to complete registration
          </p>
        </div>
        <div className="relative my-5 grid grid-rows-[200px] gap-5 overflow-y-auto overflow-x-hidden">
          <AnimatePresence>
            <motion.div
              key={formStep}
              exit={{ translateX: ["0%", "200%"] }}
              animate={{ translateX: ["-200%", "0%"] }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute left-0 top-0 grid w-full gap-2 px-2 py-2 text-xs"
            >
              {currentKeys.map((key) => {
                const fieldKey = key as keyof FormState;
                const field = schemaFieldsToRender[fieldKey];
                const Container = field?.container ?? DefaultContainer;
                if (field?.memberFields) {
                  return (
                    <Container
                      key={fieldKey}
                      name={fieldKey}
                      {...containerProps}
                    >
                      {Object.keys(field.memberFields).map((memberFieldKey) =>
                        renderFieldInput(
                          memberFieldKey as keyof FormState,
                          {},
                          key,
                        ),
                      )}
                    </Container>
                  );
                }
                return renderFieldInput(fieldKey);
              })}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="grid gap-3">
          <div
            className={clsx(
              "grid grid-cols-1  justify-center gap-4",
              !!formStep && !mutation.isSuccess && "grid-cols-2",
            )}
          >
            {!!formStep && !mutation.isSuccess && (
              <AuthButton
                type="button"
                onClick={() => setFormStep((v) => v - 1)}
              >
                <ArrowLeft className="mr-2 text-sm" />
                Back
              </AuthButton>
            )}
            <AuthButton
              pending={mutation.isPending}
              success={mutation.isSuccess}
            >
              {formStep + 1 !== STEP_COUNT ? "Next" : "Create Account"}
            </AuthButton>
          </div>

          <span className="text-sm">
            Aleready have an account?{" "}
            <Link href="/signIn" className="text-[#00AFF4]">
              Login
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}
