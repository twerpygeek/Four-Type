import Link from 'next/link'
import { getFieldGuidePolicies, type FieldGuidePolicies, type FieldGuidePolicyKey } from '@/lib/field-guide/policies'

const policyLabels: Record<FieldGuidePolicyKey, string> = {
  refund: 'Refund policy',
  privacy: 'Privacy',
  terms: 'Terms',
  contact: 'Contact support',
}

export default function FieldGuidePolicyLinks({
  policies = getFieldGuidePolicies(),
}: {
  policies?: FieldGuidePolicies
}) {
  return (
    <nav aria-label="Policy and support links" className="field-guide-policy-links">
      <p className="field-guide-eyebrow">Policies and support</p>
      <p className="field-guide-prose">
        {(['refund', 'privacy', 'terms', 'contact'] as const).map((key, index) => (
          <span key={key}>
            {index > 0 ? ' · ' : ''}
            {policies[key].href ? (
              <Link className="field-guide-text-link" href={policies[key].href}>{policyLabels[key]}</Link>
            ) : (
              <span>{policies[key].copy}</span>
            )}
          </span>
        ))}
      </p>
    </nav>
  )
}
