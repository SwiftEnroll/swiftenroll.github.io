# Documentation Requirements

## The Documentation Rule

**Documentation is part of the feature.**

Code and documentation must evolve together. If behavior changes, documentation MUST be updated in the same PR.

## What Must Be Updated

| Change Type | Update These Files |
|-------------|-------------------|
| Setup/commands change | `README.md` |
| `hugo.toml` parameters change | `docs/CONFIGURATION.md` |
| New shortcodes | `docs/SHORTCODES.md` |
| Workflows change | `docs/engineering/WORKFLOW.md` |
| Architecture change | `docs/architecture/OVERVIEW.md` |
| New common task | `docs/runbooks/COMMON_TASKS.md` |

If you cannot find documentation to update, **create it**.

## Before Submitting Checklist

When submitting a PR, verify:

- [ ] User-visible behavior documented
- [ ] Configuration changes documented
- [ ] Setup instructions verified and accurate
- [ ] Integration changes reflected
- [ ] Architecture diagrams updated (if applicable)
- [ ] New workflows added to runbooks
- [ ] Code examples tested and working

## Documentation Standards

### Structure
Each document should:
- **Describe scope** - What this document covers
- **Define invariants** - What must always be true
- **Link to related areas** - Cross-reference relevant docs
- **Avoid narrative history** - Focus on current state, not evolution

### Style
- Use clear, concise language
- Include code examples where helpful
- Use tables and lists for scannable content
- Keep each document focused on a single concern

### Maintenance
- Update docs in the same PR as code changes
- Mark deprecated features clearly
- Remove outdated information immediately
- Keep "Last Updated" dates current

---

**Last Updated:** 2026-02-15
