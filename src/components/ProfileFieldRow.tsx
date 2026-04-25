type Base = {
  sectionLabel: string
}

type DisplayFieldProps = Base & {
  editable?: false
  value: string
  onEdit: () => void
  /** e.g. aria-label for the edit control */
  editLabel?: string
}

type EditableFieldProps = Base & {
  editable: true
  /** Raw digit string (e.g. "500", "1200") */
  value: string
  onValueChange: (value: string) => void
  onBlur?: () => void
  id?: string
  inputMode?: 'numeric' | 'text' | 'decimal'
  placeholder?: string
}

type Props = DisplayFieldProps | EditableFieldProps

function isEditable(props: Props): props is EditableFieldProps {
  return props.editable === true
}

export function ProfileFieldRow(props: Props) {
  return (
    <div>
      <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-phia-muted">
        {props.sectionLabel}
      </div>
      {isEditable(props) ? (
        <div className="flex min-h-[2.75rem] items-stretch overflow-hidden rounded-xl border border-phia-border bg-white px-3.5">
          <span
            className="flex min-w-0 items-center pr-0.5 font-sans text-sm font-medium text-phia-muted"
            aria-hidden
          >
            $
          </span>
          <input
            id={props.id}
            type="text"
            inputMode={props.inputMode ?? 'numeric'}
            autoComplete="off"
            placeholder={props.placeholder}
            className="min-w-0 flex-1 border-0 bg-transparent py-3 pr-0 pl-0.5 font-sans text-sm font-medium text-phia-text outline-none ring-0 placeholder:text-phia-muted/60"
            value={props.value}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 7)
              props.onValueChange(v)
            }}
            onBlur={props.onBlur}
            aria-label={`${props.sectionLabel} in US dollars`}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-phia-border bg-white px-3.5 py-3">
          <span className="min-w-0 font-sans text-sm font-medium text-phia-text">{props.value}</span>
          <button
            type="button"
            onClick={props.onEdit}
            className="shrink-0 font-sans text-sm font-medium text-phia-blue"
          >
            {props.editLabel ?? 'Edit'}
          </button>
        </div>
      )}
    </div>
  )
}
