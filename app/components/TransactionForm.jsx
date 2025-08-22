"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createTransaction } from "../features/transactions/transactionAPI";

const TransactionSchema = Yup.object().shape({
  type: Yup.string().required("Pilih tipe transaksi"),
  amount: Yup.number()
    .typeError("Jumlah harus angka")
    .positive("Jumlah harus lebih dari 0")
    .required("Jumlah wajib diisi"),
  category: Yup.string().required("Kategori wajib diisi"),
  date: Yup.date().required("Tanggal wajib diisi"),
  note: Yup.string().required("Catatan wajib diisi"),
});

export default function TransactionForm({ onSuccess }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Tambah Transaksi</h2>
      <Formik
        initialValues={{
          type: "expense",
          amount: "",
          category: "",
          date: "",
          note: "",
        }}
        validationSchema={TransactionSchema}
        onSubmit={async (values, { resetForm }) => {
          await createTransaction(values);
          resetForm();
          if (onSuccess) onSuccess();
        }}
      >
        {() => (
          <Form className="grid gap-4">
            {/* Type */}
            <div>
              <label className="block mb-1">Tipe</label>
              <Field as="select" name="type" className="border p-2 rounded w-full">
                <option value="expense">Pengeluaran</option>
                <option value="income">Pemasukan</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-1">Jumlah</label>
              <Field name="amount" type="number" className="border p-2 rounded w-full" />
              <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1">Kategori</label>
              <Field name="category" type="text" className="border p-2 rounded w-full" />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1">Tanggal</label>
              <Field name="date" type="date" className="border p-2 rounded w-full" />
              <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Note */}
            <div>
              <label className="block mb-1">Catatan</label>
              <Field name="note" type="text" className="border p-2 rounded w-full" />
              <ErrorMessage name="note" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Simpan
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
