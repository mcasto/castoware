<div class="about-container">
    <div class="about-max-width">
        {{-- Header --}}
        <div class="text-center q-mb-xl">
            <h1 class="text-h3 text-weight-bold q-mb-md" style="color: {{ $colors['primary'] }}">
                About CastoWare
            </h1>
            <div class="header-divider q-mb-md" style="background-color: {{ $colors['secondary'] }}"></div>
        </div>

        {{-- Team Members --}}
        <div class="q-gutter-y-xl">
            @foreach ($teamMembers as $member)
                <div class="row q-col-gutter-md">
                    {{-- Left side - Name and Role --}}
                    <div class="col-12 col-sm-4">
                        <h2 class="text-h5 text-weight-bold q-mb-sm" style="color: {{ $colors['primary'] }}">
                            {{ $member['name'] }}
                        </h2>
                        <p class="text-body1 text-weight-medium q-mb-md" style="color: {{ $colors['secondary'] }}">
                            {{ $member['role'] }}
                        </p>
                        <div class="accent-divider" style="background-color: {{ $colors['accent'] }}"></div>

                        <div>
                            @if ($member['name'] === 'Mike Casto')
                                <img src="{{ asset('/storage/images/mike-working.jpg') }}" alt="{{ $member['name'] }}"
                                    class="team-member-image" />
                            @elseif($member['name'] === 'Margaret Westlake')
                                <img src="{{ asset('/storage/images/meg-working.jpg') }}" alt="{{ $member['name'] }}"
                                    class="team-member-image" />
                            @endif
                        </div>
                    </div>

                    {{-- Right side - Bio --}}
                    <div class="col-12 col-sm-8 q-gutter-y-sm">
                        @foreach ($member['bio'] as $paragraph)
                            <p class="text-body1 text-grey-8 q-pt-lg" style="line-height: 1.625;">
                                {!! $paragraph !!}
                            </p>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>

        {{-- Together Section --}}
        <div class="q-mt-xl q-pt-xl" style="border-top: 1px solid #e5e7eb;">
            <div class="row q-col-gutter-md about-max-width">
                {{-- Left side - Image --}}
                <div class="col-12 col-sm-4">
                    <div>
                        <h2 class="text-h5 text-weight-bold q-mb-sm" style="color: {{ $colors['primary'] }}">
                            {{ $together['label'] }}
                        </h2>
                    </div>

                    <div class="accent-divider" style="background-color: {{ $colors['accent'] }}"></div>

                    <img src="{{ asset('/storage/images/together.jpg') }}" alt="Together" class="together-image" />
                </div>

                {{-- Right side - Content --}}
                <div class="col-12 col-sm-8 q-pl-xl">
                    <p class="text-body1 text-grey-8 q-mb-lg" style="line-height: 1.625;">
                        {!! $together['text'] !!}
                    </p>

                    <div class="goal-box" style="border-left-color: {{ $colors['accent'] }}">
                        <p class="text-h6 text-weight-medium text-italic" style="color: {{ $colors['primary'] }}">
                            {!! $goal !!}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
